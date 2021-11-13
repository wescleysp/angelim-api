import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

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
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('qtdrequested')
      table.integer('qtdserverd')
      table.decimal('inputvalue', 10, 2)
      table.decimal('outputvalue', 10, 2)
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
