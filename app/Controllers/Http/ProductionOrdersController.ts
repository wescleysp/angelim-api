import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'


import ProductionOrders from 'App/Models/ProductionOrder'
import ProductionItems from 'App/Models/ProductionItem'

export default class ProductionOrdersController {

  public async store ({ request }: HttpContextContract) {
    const data = request.except(['items'])
    const items = request.input('items')

    items.forEach((item: any) => {
      delete item.id
    })

    const productionOrders = await ProductionOrders.create(data)
    await productionOrders.related('production_items').createMany(items)

    return productionOrders
  }

  public async show ({ params }: HttpContextContract) {
    const data = await ProductionOrders.query().where('order_id', params.id).preload('production_items')
    data[0].production_date = format(data[0].production_date, 'yyyy-MM-dd')
    return data
  }

  public async update ({ params, request }: HttpContextContract) {
    const production = await ProductionOrders.findByOrFail('order_id', params.id)
    await ProductionItems.query().where('production_id', production.id).delete()
    production.delete()

    const data = request.except(['items'])
    const items = request.input('items')

    items.forEach((item: any) => {
      delete item.id
      delete item.created_at
      delete item.updated_at
    })

    const productionOrders = await ProductionOrders.create(data)
    await productionOrders.related('production_items').createMany(items)
    return productionOrders

  }


}
