import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Duties extends BaseSchema {
  protected tableName = 'duties'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('order_id')
        .unsigned()
        .references('sales_orders.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('transport_id')
        .unsigned()
        .references('transports.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('provider_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')


      table.string('cte', 50)
      table.string('ncte', 50)
      table.string('nmanifest', 50)
      table.string('status_m', 10)
      table.decimal('value', 10, 2)
      table.decimal('discount', 10, 2)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
