import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reforestations extends BaseSchema {
  protected tableName = 'reforestations'

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
        .integer('provider_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('amount')
      table.decimal('value', 10, 2)
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
