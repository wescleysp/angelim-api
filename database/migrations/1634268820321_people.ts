import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class People extends BaseSchema {
  protected tableName = 'people'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100)
      table.string('surname', 100)
      table.string('cpfcnpj', 15).unique()
      table.string('ie', 14)
      table.string('email', 100)
      table.string('cellphone', 11) 
      table.string('phone', 10)
      table.boolean('active')
        .notNullable()
        .defaultTo(1)

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
