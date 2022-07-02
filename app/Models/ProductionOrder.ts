import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, } from '@ioc:Adonis/Lucid/Orm'

import ProductionItem from 'App/Models/ProductionItem'

export default class ProductionOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order_id: number

  @column()
  public provider_id: number

  @column()
  public payment_type: string

  @column()
  public production_date: string

  @column()
  public obs: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ProductionItem, {
    foreignKey: 'production_id',
  })
  public production_items: HasMany<typeof ProductionItem>
}
