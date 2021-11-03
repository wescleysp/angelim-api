import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterAdresses1s extends BaseSchema {
  protected tableName = 'adresses'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('person_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .after('id')
      table
        .integer('type_id')
        .unsigned()
        .references('types.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .after('person_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
