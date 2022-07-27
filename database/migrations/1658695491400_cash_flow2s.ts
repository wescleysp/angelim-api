import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CashFlow2s extends BaseSchema {
  protected tableName = 'cash_flows'

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
   
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
