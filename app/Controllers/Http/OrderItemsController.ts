 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import OrderItem from 'App/Models/OrderItem'

export default class OrderItemsController {
  
  public async show ({ params }: HttpContextContract) {
    return await OrderItem.query().where('order_id', params.id)
  }
}
