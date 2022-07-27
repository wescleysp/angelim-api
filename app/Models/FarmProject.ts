import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column,
  hasMany,
  HasMany, 
} from '@ioc:Adonis/Lucid/Orm'

import ProjectItem from 'App/Models/ProjectItem'

export default class FarmProject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type_id: number

  @column()
  public provider_id: number

  @column()
  public surname: string

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column()
  public area: number

  @column()
  public obs: string

  @column()
  public status: string

  @column()
  public logical_delete: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ProjectItem, {
    foreignKey: 'project_id',
  })
  public project_items: HasMany<typeof ProjectItem>
}
