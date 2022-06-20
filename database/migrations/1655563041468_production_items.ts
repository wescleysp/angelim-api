import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductionItems extends BaseSchema {
  protected tableName = 'production_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('production_id')
        .unsigned()
        .references('production_orders.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('item_id')
        .unsigned()
        .references('order_items.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('amount')
      table.string('unity', 10)
      table.string('description')
       
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
