import { DateTime } from 'luxon'
import { 
  BaseModel,
  column, 
  hasOne, 
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'

import Type from 'App/Models/Type'
import Adress from 'App/Models/Adress'
import SalesOrder from 'App/Models/SalesOrder'

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

  @column()
  public provider_type: number

  @column()
  public logical_delete: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Type)
  public type: HasOne<typeof Type>

  @hasOne(() => SalesOrder, {
    foreignKey: 'provider_id'
  })
  public provider: HasOne<typeof SalesOrder>

  @hasOne(() => Adress, {
    foreignKey: 'person_id'
  })
  public adresses: HasOne<typeof Adress>

  
}