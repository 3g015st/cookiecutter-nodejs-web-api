import { MigrationInterface, QueryRunner } from "typeorm";

export class createTodos1680873141301 implements MigrationInterface {
    name = 'createTodos1680873141301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "isDeleted" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "isDeleted" DROP DEFAULT`);
    }

}
