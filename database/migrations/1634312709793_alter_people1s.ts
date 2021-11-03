import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterPeople1s extends BaseSchema {
  protected tableName = 'people'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('type_id')
        .unsigned()
        .references('types.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .after('phone')
      
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('type_id')
    })
  }
}
