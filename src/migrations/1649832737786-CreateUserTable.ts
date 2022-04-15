import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1649832737786 implements MigrationInterface {
    name = 'CreateUserTable1649832737786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_b90677e3d515d915033134fc5f4" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_b90677e3d515d915033134fc5f4"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "ownerId"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
