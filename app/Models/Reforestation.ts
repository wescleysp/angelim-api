import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reforestation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public project_id: number

  @column()
  public provider_id: number

  @column()
  public amount: number

  @column()
  public value: number

  @column()
  public logical_delete: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
