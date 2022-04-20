import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1650463933972 implements MigrationInterface {
    name = 'UpdateUserTable1650463933972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
