import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookTable1650022472837 implements MigrationInterface {
    name = 'UpdateBookTable1650022472837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "isLend" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "isLend" DROP DEFAULT`);
    }

}
