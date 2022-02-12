import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { format } from 'date-fns'

import OrderSales from 'App/Models/SalesOrder'
import CashFlow from 'App/Models/CashFlow'
import OrderItem from 'App/Models/OrderItem'
import Seller from 'App/Models/Seller'

const calcTotals = (items: any) => {
  let totalValue = 0;
  items.map(item => totalValue = totalValue + (item.qtdrequested * item.inputvalue))
  return totalValue;
}


export default class OrdersController {
  public async index() {
    let orders = await OrderSales.query().orderBy('created_at', 'desc')
      .preload('order_items')

    await Promise.all(orders.map(async (element, idx) => {
      orders[idx].provider_id !== null && (orders[idx].provider_id = (await Database.from('people').select('name').where('id', '=', element.provider_id))[0].name)
      orders[idx].client_id !== null && (orders[idx].client_id = (await Database.from('people').select('name').where('id', '=', element.client_id))[0].name)
    }));

    return orders
  }

  public async store({ request }: HttpContextContract) {
    const data = request.except(['order_items', 'seller_id', 'seller_value'])
    const items = request.input('order_items')
    const seller = request.input('seller')

    const orderData = Object.fromEntries(Object.entries(data).filter((item) => item[1] !== ''));
    const order = await OrderSales.create(orderData)

    await order.related('order_items').createMany(items)

    // Movimentações de caixa fornecedor
    if (!!orderData.provider_id) {
      await order.related('cashflow').create({
        value: calcTotals(items),
        type_id: 7,
        provider_id: data.provider_id,
        duedate: format(new Date(), 'yyyy/MM/dd')
      })
    }

    // Movimentação de caixa Representante
    if (!!seller.provider_id) {
      await order.related('seller').create({
        provider_id: seller.provider_id,
        value: seller.value,
      })

      await order.related('cashflow').create({
        value: seller.value,
        type_id: 7,
        provider_id: seller.provider_id,
        duedate: format(new Date(), 'yyyy/MM/dd')
      })

    }

    return order

  }

  public async show({ params }: HttpContextContract) {
    const response =  await OrderSales.query().where('id', params.id)
      .preload('order_items').preload('seller')

    return response

  }

  public async update({ params, request }: HttpContextContract) {

    const order = await OrderSales.findByOrFail('id', params.id)
    const data = request.except(['order_items', 'seller_id', 'seller_value'])
    const orderData = Object.fromEntries(Object.entries(data).filter((item) => item[1] !== ''));

    const items = request.input('order_items')

    const dataSeller = request.input('seller')


    // ***** Movimentações de caixa fornecedor ********
    if (!!orderData.provider_id) {

      if (orderData.provider_id !== order.provider_id){
        // exclusão movimentações antigas
        
        await CashFlow.query()
        .where('order_id', params.id)
        .where('provider_id', order.provider_id).delete()

        // Exclusão itens antigos
        await OrderItem.query().where('order_id', order.id).delete()
        
        // Gravar novos itens
        await order.related('order_items').createMany(items)
      }

      // Gravar nova movimentação
      (!order.provider_id || orderData.provider_id !== order.provider_id) && await order.related('cashflow').create({
        value: calcTotals(items),
        type_id: 7,
        provider_id: orderData.provider_id,
        duedate: format(new Date(), 'yyyy/MM/dd')
      })
    }

    // Movimentação de caixa Representante
    if (!!dataSeller.provider_id) {
      try {
        const seller = await Seller.findByOrFail('order_id', params.id)

        if (dataSeller.provider_id !== seller.provider_id) {
  
          const flowSeller = await CashFlow.query()
            .where('order_id', params.id)
            .where('provider_id', seller.provider_id)
          
          await flowSeller[0].merge(
            {
              value: dataSeller.value,
              provider_id: dataSeller.provider_id,
            }
          ).save()
          
          await seller.merge({
            provider_id: dataSeller.provider_id,
            value: dataSeller.value
          }).save()
        }

      } catch (error) {
        await order.related('seller').create({
          provider_id: dataSeller.provider_id,
          value: dataSeller.value,
        })
  
        await order.related('cashflow').create({
          value: dataSeller.value,
          type_id: 7,
          provider_id: dataSeller.provider_id,
          duedate: format(new Date(), 'yyyy/MM/dd')
        })

      }
    }

    // Atualização pedido
    await order.merge(orderData).save();

    return order;

  }

  public async destroy({ params }: HttpContextContract) { }

}
