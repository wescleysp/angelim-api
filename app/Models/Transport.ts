import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transport extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order_id: number

  @column()
  public type_id: number

  @column()
  public provider_id: number

  @column()
  public cart: string

  @column()
  public horse: string

  @column()
  public ferry: string

  @column()
  public origin: string

  @column()
  public destiny: string

  @column()
  public date_origin: DateTime

  @column()
  public date_destiny: DateTime

  @column()
  public valuemeters: number

  @column()
  public loading: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
