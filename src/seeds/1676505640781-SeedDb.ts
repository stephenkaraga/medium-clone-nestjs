import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedDb1674531679938 implements MigrationInterface {
    name = 'SeedDb1674531679938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`);

        //password is 123
        await queryRunner.query(`INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$PQpLlV4oXnqGEvjEH7RSCO51zY7vWrcqPmzNmdGXNTIOffXq2i4vu')`);

        await queryRunner.query(`INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First article description', 'First article body', 'coffee, dragons', 1)`)

       await queryRunner.query(`INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('seconed-article', 'Seconed article', 'Second article description', 'Second article body', 'coffee, dragons', 1)`)
    }

    public async down(): Promise<void> {}

}