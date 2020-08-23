import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { identity, pickBy } from "lodash";
import {
  DeepPartial,
  Equal,
  FindConditions,
  FindOneOptions,
  Like,
} from "typeorm";

import { RoleType } from "../../common/constants/role-type";
import { OwnerShipChangeDto } from "../../common/dto/OwnerShipChangeDto";
import { PageMetaDto } from "../../common/dto/PageMetaDto";
import { UserEntity } from "../user/user.entity";
import { ClientEntity } from "./client.entity";
import { ClientRepository } from "./client.repository";
import { ClientCreateDto } from "./dto/ClientCreateDto";
import { ClientDto } from "./dto/ClientDto";
import { ClientsPageDto } from "./dto/ClientPageDto";
import { ClientsPageOptionsDto } from "./dto/ClientPageOptionsDto";
import { ClientUpdateDto } from "./dto/ClientUpdateDto";

@Injectable()
export class ClientService {
  constructor(private readonly _clientRepository: ClientRepository) {}

  /**
   * Find single client
   */
  async findOne(
    findData: FindConditions<ClientEntity>,
    options?: FindOneOptions<ClientEntity>
  ): Promise<ClientEntity> {
    const client = await this._clientRepository.findOne(findData, options);
    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }

  async getClients(
    pageOptionsDto: ClientsPageOptionsDto
  ): Promise<ClientsPageDto> {
    const where: FindConditions<ClientEntity> = {};
    if (pageOptionsDto.q) {
      where.lastName = Like(`%${pageOptionsDto.q}%`);
    }
    if (pageOptionsDto.melliCode) {
      where.melliCode = Like(`%${pageOptionsDto.melliCode}%`);
    }
    if (pageOptionsDto.phone) {
      where.phone = Like(`%${pageOptionsDto.phone}%`);
    }

    const [clients, clientsCount] = await this._clientRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order,
      },
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: clientsCount,
    });
    return new ClientsPageDto(clients.toDtos(), pageMetaDto);
  }

  async createClient(
    createDto: ClientCreateDto,
    creator?: UserEntity
  ): Promise<ClientEntity> {
    const create: DeepPartial<ClientEntity> = {
      ...createDto,
    };
    const client = this._clientRepository.create({ ...create, creator });
    return this._clientRepository.save(client);
  }

  async deleteClient(id: string, creator: UserEntity): Promise<ClientDto> {
    const found = await this.findOne({ id });
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }
    const client = await this._clientRepository.delete(id);
    if (client.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateClient(
    id: string,
    updatePlanDto: ClientUpdateDto,
    creator: UserEntity
  ): Promise<ClientDto> {
    const found = await this.findOne({ id });
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }
    const update: DeepPartial<ClientEntity> = {
      ...updatePlanDto,
    };

    const updated = await this._clientRepository.update(
      id,
      pickBy(update, identity)
    );
    if (updated.affected === 0) {
      throw new NotFoundException();
    }
    return (await this.findOne({ id })).toDto();
  }

  async changeOwnership({ nextOwner, pervOwner }: OwnerShipChangeDto) {
    const res = await this._clientRepository.update(
      { creatorId: Equal(pervOwner) },
      { creator: { id: nextOwner } }
    );
    return {
      effected: res.affected ?? 0,
    };
  }
}
