import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntity1650535399990 implements MigrationInterface {
    name = 'AddBaseEntity1650535399990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "createBy" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updateBy" uuid`);
        await queryRunner.query(`ALTER TABLE "author" ALTER COLUMN "createAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ALTER COLUMN "updateAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ALTER COLUMN "createBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ALTER COLUMN "updateBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updateAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "createAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "updateAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "createBy" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "updateBy" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "updateBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "createBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "updateAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "createAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updateAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ALTER COLUMN "updateBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ALTER COLUMN "createBy" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ALTER COLUMN "updateAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ALTER COLUMN "createAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createBy"`);
    }

}
