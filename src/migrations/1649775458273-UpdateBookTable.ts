import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookTable1649775458273 implements MigrationInterface {
    name = 'UpdateBookTable1649775458273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "publisher" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "publishYear" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "publishYear" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "publisher" SET NOT NULL`);
    }

}
