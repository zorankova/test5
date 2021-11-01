import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1635792773754 implements MigrationInterface {
    name = 'Migration1635792773754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "passwordHash" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "body" character varying NOT NULL, "authorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
