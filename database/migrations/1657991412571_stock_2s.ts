import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stock_2s extends BaseSchema {
  protected tableName = 'stocks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('project_id')
        .unsigned()
        .references('farm_projects.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .after('order_id')
      table
        .integer('nfe_id')
        .unsigned()
        .references('nfes.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .after('project_id')
      table
        .integer('place_id')
        .unsigned()
        .references('people.id')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .after('description')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
