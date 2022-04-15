import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1649773493243 implements MigrationInterface {
    name = 'BaseMigration1649773493243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "id" DROP DEFAULT`);
    }

}
