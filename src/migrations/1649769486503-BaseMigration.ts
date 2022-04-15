import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseMigration1649769486503 implements MigrationInterface {
  name = 'BaseMigration1649769486503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "publisher" character varying NOT NULL, "publishYear" integer NOT NULL, "isLend" boolean NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
