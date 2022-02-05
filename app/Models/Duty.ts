import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Duty extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public transport_id: number

  @column()
  public cte: string

  @column()
  public ncte: string

  @column()
  public nmanifest: string

  @column()
  public status_m: string

  @column()
  public value: number

  @column()
  public discount: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
