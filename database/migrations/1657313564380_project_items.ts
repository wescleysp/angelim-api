import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProjectItems extends BaseSchema {
  protected tableName = 'project_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('project_id')
        .unsigned()
        .references('farm_projects.id')
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

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
