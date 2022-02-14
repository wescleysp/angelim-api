import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  afterCreate
} from '@ioc:Adonis/Lucid/Orm'

import { format } from 'date-fns'

import OrderItem from 'App/Models/OrderItem'
import CashFlow from 'App/Models/CashFlow'
import Seller from 'App/Models/Seller'

export default class SalesOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public provider_id: number

  @column()
  public client_id: number

  @column()
  public nfe: string

  @column()
  public dof: string

  @column()
  public dare: string

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

  @afterCreate()
  public static async codeGenerator (salesOrder: SalesOrder) {
    await salesOrder.merge({code: format(new Date(), 'yyyyMM')+salesOrder.id}).save()
  }

  @hasMany(() => OrderItem, {
    foreignKey: 'order_id',
  })
  public order_items: HasMany<typeof OrderItem>


  @hasOne(() => CashFlow, {
    foreignKey: 'order_id'
  })
  public cashflow: HasOne<typeof CashFlow>

  @hasOne(() => Seller, {
    foreignKey: 'order_id'
  })
  public seller: HasOne<typeof Seller>

}
