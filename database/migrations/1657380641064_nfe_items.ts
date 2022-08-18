import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NfeItems extends BaseSchema {
  protected tableName = 'nfe_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('nfe_id')
        .unsigned()
        .references('nfes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('itemproject_id')
        .unsigned()
        .references('project_items.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('product_id')
        .unsigned()
        .references('products.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('units')
      table.integer('amount')
      table.decimal('value', 10, 2)
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
