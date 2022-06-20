import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductionOrders extends BaseSchema {
  protected tableName = 'production_orders'

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
        .integer('provider_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('payment_type')
      table.datetime('production_date')
      table.text('obs')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
