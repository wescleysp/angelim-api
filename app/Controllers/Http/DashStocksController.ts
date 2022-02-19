// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

import Stock from 'App/Models/Stock'
import Product from 'App/Models/Product'

export default class DashStocksController {
  public async index() {
    let response = {
      total: 0,
      serrada: 0,
      tora: 0,
    }

    const dataStock = await Stock.query()
      .where('logical_delete', 0)
      .where((query) => {
        query
        .where('created_at', '>=', `${format(new Date(), 'yyyy-MM')}-01`)
        .orWhere('created_at', '<=', `${format(new Date(), 'yyyy-MM')}-31`)
      })

    let responseData: any = [];

    await Promise.all(dataStock.map(async (element, idx) => {
      let data = dataStock[idx].serializeAttributes()
      const product = await Product.findByOrFail('id', element.product_id)
      data.product_type = product.type_id
      responseData.push(data)
    }));

    const serrada = responseData.filter(item => item.product_type === 5)
    const tora = responseData.filter(item => item.product_type === 6)

    if (dataStock.length > 0) {
      response.total = 
      (dataStock.filter(item => item.type_id === 9).reduce((count: number, currentValue: any) => { return count + currentValue.volume }, 0)
      - dataStock.filter(item => item.type_id === 10).reduce((count: number, currentValue: any) => { return count + currentValue.volume }, 0))
    }

    if (serrada.length > 0) {
      response.serrada = 
      (serrada.filter(item => item.type_id === 9).reduce((count: number, currentValue: any) => { return count + currentValue.volume }, 0)
      - serrada.filter(item => item.type_id === 10).reduce((count: number, currentValue: any) => { return count + currentValue.volume }, 0))
    }

    if (tora.length > 0) {
      response.tora = 
      (tora.filter(item => item.type_id === 9).reduce((count: number, currentValue: any) => { return count + currentValue.volume }, 0)
      - tora.filter(item => item.type_id === 10).reduce((count: number, currentValue: any) => { return count + currentValue.volume }, 0))
    }

    return response
  }
}
