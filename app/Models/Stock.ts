import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_id: number

  @column()
  public volume: number

  @column()
  public type_id: number

  @column()
  public order_id: number

  @column()
  public project_id: number

  @column()
  public nfe_id: number

  @column()
  public description: string

  @column()
  public place_id: number

  @column()
  public logical_delete: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
