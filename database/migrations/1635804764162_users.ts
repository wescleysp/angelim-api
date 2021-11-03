import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 255).notNullable()
      table.string('password', 60).notNullable()
      table.boolean('active')
        .notNullable()
        .defaultTo(1)
      table.boolean('block ')
        .notNullable()
        .defaultTo(0)
      table.string('token')
      table.timestamp('token_created_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
