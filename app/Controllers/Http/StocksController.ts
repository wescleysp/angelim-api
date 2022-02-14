import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Stock from 'App/Models/Stock'
import SalesOrder from 'App/Models/SalesOrder'
import Product from 'App/Models/Product'



export default class StocksController {
  public async index() {
    let stock = await Stock.query().where('logical_delete', 0).orderBy('created_at', 'desc')
    let responseData: any = [];

    await Promise.all(stock.map(async (element, idx) => {
      let data = stock[idx].serializeAttributes()
      const product = await Product.findByOrFail('id', element.product_id)
      data.product_id = product.name
      data.product_type = product.type_id
      !!element.order_id && (data.order_code = (await SalesOrder.findByOrFail('id', element.order_id)).code)
      responseData.push(data)
    }));

    return responseData
  }

  public async store({ request }: HttpContextContract) {
    const data = request.all();
    await Stock.create(data)
  }
  
}
