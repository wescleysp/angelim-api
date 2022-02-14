// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stock from 'App/Models/Stock'
import Product from 'App/Models/Product'

export default class DashStocksController {
  public async index() {
    let response = {
      total: 0,
      serrada: 0,
      tora: 0,
    }

    const dataStock = await Stock.query().where('logical_delete', 0)

    let responseData: any = [];

    await Promise.all(dataStock.map(async (element, idx) => {
      let data = dataStock[idx].serializeAttributes()
      const product = await Product.findByOrFail('id', element.product_id)
      data.product_type = product.type_id
      responseData.push(data)
    }));

    const serrada = responseData.filter(item => item.product_type === 5)
    const tora = responseData.filter(item => item.product_type === 6)
    

    dataStock.length > 0 && (response.total = dataStock.reduce(
      (count: number, currentValue: any) => { return count + currentValue.volume }, 0))

      serrada.length > 0 && (response.serrada = serrada.reduce(
      (count: number, currentValue: any) => { return count + currentValue.volume }, 0))

      tora.length > 0 && (response.tora = tora.reduce(
      (count: number, currentValue: any) => { return count + currentValue.volume }, 0))
    return response
  }
}
