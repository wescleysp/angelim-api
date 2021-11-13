import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CashFlows extends BaseSchema {
  protected tableName = 'cash_flows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('value', 10, 2)
      table
        .integer('type_id')
        .unsigned()
        .references('types.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('provider_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.datetime('duedate')
      table.string('description')
      table.boolean('delete')
        .notNullable()
        .defaultTo(0)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
