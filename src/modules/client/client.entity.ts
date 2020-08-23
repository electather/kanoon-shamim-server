// eslint-disable-next-line simple-import-sort/sort
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../common/abstract.entity";
import { SessionEntity } from "../session/session.entity";
import { UserEntity } from "../user/user.entity";
import { ClientDto } from "./dto/ClientDto";

@Entity({ name: "clients" })
export class ClientEntity extends AbstractEntity<ClientDto> {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  melliCode: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  targetMarket: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true })
  marriageStatus: string;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  numberOfChildren: string;

  @Column({
    type: "timestamp without time zone",
  })
  birthDate: Date;

  @Column({ nullable: true })
  doctorNotes: string;

  @OneToMany(() => SessionEntity, (item) => item.client, { cascade: true })
  sessions?: SessionEntity[];

  @ManyToOne(() => UserEntity, (user) => user.clients, { nullable: false })
  creator: UserEntity;

  @Column({ nullable: true })
  creatorId?: string;

  @ManyToOne(() => UserEntity, (user) => user.clients, { nullable: true })
  doctor?: UserEntity;

  @Column({ nullable: true })
  doctorId?: string;

  dtoClass = ClientDto;
}
