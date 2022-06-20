import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterPeople2s extends BaseSchema {
  protected tableName = 'people'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
      .integer('provider_type')
      .unsigned()
      .references('types.id')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      .after('type_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
