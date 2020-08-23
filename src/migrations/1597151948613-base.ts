import {MigrationInterface, QueryRunner} from "typeorm";

export class base1597151948613 implements MigrationInterface {
    name = 'base1597151948613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('SECRETARY', 'DOCTOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying, "role" "users_role_enum" NOT NULL, "creator_id" uuid, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "file" character varying NOT NULL, "creator_id" uuid NOT NULL, "session_id" uuid NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "sessions_status_enum" AS ENUM('DONE', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "session_notes" character varying, "doctor_id" uuid, "client_id" uuid, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "creator_id" uuid, "status" "sessions_status_enum", CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "melli_code" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying, "notes" character varying, "doctor_notes" character varying, "creator_id" uuid, "doctor_id" uuid, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_eebaffddb3c6e049fa709e7de02" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_a8b5cf9abdae34c2dfd58823dce" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_73ecff86bd2964ea1f8db5f671b" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_348ee0ff980879d47e6e5c435c7" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_7af6ac1cd093d361012865a0a48" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_a36a9c21cda32357717a80235b8" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_3d3fa64cf511e9252c8f1ab9c5e" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_8cdfa2d804277771500756660a3" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_8cdfa2d804277771500756660a3"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_3d3fa64cf511e9252c8f1ab9c5e"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_a36a9c21cda32357717a80235b8"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_7af6ac1cd093d361012865a0a48"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_348ee0ff980879d47e6e5c435c7"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_73ecff86bd2964ea1f8db5f671b"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_a8b5cf9abdae34c2dfd58823dce"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_eebaffddb3c6e049fa709e7de02"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TYPE "sessions_status_enum"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }

}
