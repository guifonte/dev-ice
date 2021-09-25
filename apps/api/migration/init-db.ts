import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class InitDB implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(128)',
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'device',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'color',
            type: 'varchar(16)',
          },
          {
            name: 'partNumber',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'categoryId',
            type: 'int',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'device',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('device');
    await queryRunner.dropTable('category');
  }
}
