import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Type from 'App/Models/Type'

export default class Adress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public person_id: number

  @column()
  public type_id: number

  @column()
  public street: string
  
  @column()
  public number: string

  @column()
  public complement: string

  @column()
  public district: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public cep: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Type)
  public type: HasOne<typeof Type>
}