import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntity1650534873822 implements MigrationInterface {
    name = 'AddBaseEntity1650534873822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" ADD "createAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "author" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "author" ADD "createBy" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ADD "updateBy" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "book" ADD "createAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "book" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "book" ADD "createBy" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "updateBy" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "updateBy"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "createBy"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "updateBy"`);
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "createBy"`);
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "createAt"`);
    }

}
