import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductionItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public production_id: number

  @column()
  public item_id: number

  @column()
  public product_id: number

  @column()
  public amount: number

  @column()
  public unity: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
