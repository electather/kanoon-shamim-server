import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../common/constants/role-type';
import { ClientEntity } from '../client/client.entity';
import { SessionEntity } from '../session/session.entity';
import { UserDto } from './dto/UserDto';
import { PasswordTransformer } from './password.transformer';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ nullable: true, transformer: new PasswordTransformer() })
  password?: string;

  @Column({ type: 'enum', enum: RoleType, nullable: false })
  role: RoleType;

  @OneToMany(() => ClientEntity, (item) => item.creator)
  clients?: ClientEntity[];

  @OneToMany(() => SessionEntity, (item) => item.doctor)
  sessions?: SessionEntity[];

  @OneToMany(() => ClientEntity, (item) => item.creator)
  patients?: ClientEntity[];

  @ManyToOne(() => UserEntity, { nullable: true, cascade: true })
  creator?: UserEntity;

  @Column({ nullable: true })
  creatorId?: string;

  dtoClass = UserDto;
}
