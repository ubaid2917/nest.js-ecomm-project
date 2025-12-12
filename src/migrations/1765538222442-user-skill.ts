import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSkill1765538222442 implements MigrationInterface {
    name = 'UserSkill1765538222442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "skill" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_42557e0ad33b670a55b7bd0f725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"`);
        await queryRunner.query(`DROP TABLE "user_skill"`);
    }

}
