import {MigrationInterface, QueryRunner, Table} from "typeorm";
/**
 * Migration CreateUsers
 * Method to create Table Users.
 * #Columns: id, name, email, password, avatar, created_at, updated_at
 */
export class CreateUsers1616979572568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',

            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true
            },
            {
              name: 'password',
              type: 'varchar'
            },
            {
              name: 'avatar',
              type: 'varchar',
              isNullable: true
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users')
    }

}
