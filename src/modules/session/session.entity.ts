import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { AbstractEntity } from "../../common/abstract.entity";
import { ClientEntity } from "../client/client.entity";
import { FileEntity } from "../files/file.entity";
import { UserEntity } from "../user/user.entity";
import { SessionDto } from "./dto/SessionDto";
import { SessionStatus } from "./session-status.enum";

@Entity({ name: "sessions" })
export class SessionEntity extends AbstractEntity<SessionDto> {
  @Column({ nullable: true })
  sessionNotes?: string;

  @OneToMany(() => FileEntity, (item) => item.creator)
  sessionFiles?: FileEntity[];

  @ManyToOne(() => UserEntity, (item) => item.sessions)
  doctor: UserEntity;

  @Column({ nullable: true })
  doctorId?: string;

  @ManyToOne(() => ClientEntity, (item) => item.sessions)
  client: ClientEntity;

  @Column({ nullable: true })
  clientId?: string;

  @Column({ nullable: false, type: "timestamp without time zone" })
  startDate: Date;

  @Column({ nullable: false, type: "timestamp without time zone" })
  endDate: Date;

  @Column()
  amount: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  creator?: UserEntity;

  @Column({ nullable: true })
  creatorId?: string;

  @Column({ type: "enum", enum: SessionStatus, nullable: true })
  status: SessionStatus;

  dtoClass = SessionDto;
}
