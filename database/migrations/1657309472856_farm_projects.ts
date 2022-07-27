import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FarmProjects extends BaseSchema {
  protected tableName = 'farm_projects'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
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
      table.string('surname', 100)
      table.datetime('start_date')
      table.datetime('end_date')
      table.integer('area')
      table.text('obs')
      table.string('status', 2)
      .notNullable()
      .defaultTo(0)
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
