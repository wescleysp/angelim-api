import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transports extends BaseSchema {
  protected tableName = 'transports'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('order_id')
        .unsigned()
        .references('orders.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
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
      table.string('cart', 80)
      table.string('horse', 80)
      table.string('ferry', 80)
      table.string('origin')
      table.string('destiny')
      table.datetime('date_origin')
      table.datetime('date_destiny')
      table.decimal('valuemeters', 10, 2)
      table.decimal('loading', 10, 2)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
