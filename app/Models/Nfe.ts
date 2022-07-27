import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany,  } from '@ioc:Adonis/Lucid/Orm'

import NfeItem from './NfeItem'

export default class Nfe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public project_id: number

  @column()
  public nfe: string

  @column()
  public dof: string

  @column()
  public destiny_id: number

  @column()
  public transport_id: number

  @column()
  public transport_value: number

  @column()
  public date_nfe: DateTime

  @column()
  public logical_delete: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => NfeItem, {
    foreignKey: 'nfe_id',
  })
  public nfe_items: HasMany<typeof NfeItem>
}
