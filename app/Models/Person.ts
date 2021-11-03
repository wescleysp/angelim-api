import { DateTime } from 'luxon'
import { 
  BaseModel,
  column, 
  hasOne, 
  HasOne, 
} from '@ioc:Adonis/Lucid/Orm'

import Type from 'App/Models/Type'
import Adress from 'App/Models/Adress'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public surname: string

  @column()
  public cpfcnpj: string

  @column()
  public ie: string

  @column()
  public email: string

  @column()
  public cellphone: string

  @column()
  public phone: string

  @column()
  public type_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Type)
  public type: HasOne<typeof Type>

  @hasOne(() => Adress, {
    foreignKey: 'person_id'
  })
  public adresses: HasOne<typeof Adress>
}