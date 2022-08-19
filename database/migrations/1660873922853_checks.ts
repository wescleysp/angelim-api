import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Checks extends BaseSchema {
  protected tableName = 'checks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('bank_number', 12)
      table.string('bank_name')
      table.string('bank_agency', 12)
      table.string('check_number', 10)
      table.decimal('check_value', 10, 2)
      table.string('local')
      table.datetime('check_date')
      table.datetime('duedate')
      table.integer('check_provider')
      table.string('name')
      table.string('cpfcnpj', 15)
      table.string('description')


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
