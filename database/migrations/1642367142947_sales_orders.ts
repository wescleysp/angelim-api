import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SalesOrders extends BaseSchema {
  protected tableName = 'sales_orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('code', 16)
      table
        .integer('provider_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('client_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('nfe', 100)
      table.string('dof', 100)
      table.string('dare', 100)
      table.text('obs')
      table.string('status', 2)
      table.boolean('logical_delete')
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
