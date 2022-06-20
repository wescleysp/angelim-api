import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterType1s extends BaseSchema {
  protected tableName = 'types'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string('parent_id')
        .after('table')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
