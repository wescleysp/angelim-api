import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Nfes extends BaseSchema {
  protected tableName = 'nfes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('project_id')
        .unsigned()
        .references('farm_projects.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('nfe', 100)
      table.string('dof', 100)
      table
        .integer('destiny_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('transport_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.decimal('transport_value', 10, 2)
      table.datetime('date_nfe')
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
