import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterAuths extends BaseSchema {
  protected tableName = 'auth_models'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
      .string('username', 255)
      .notNullable()
      .after('id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name')
    })
  }
}
