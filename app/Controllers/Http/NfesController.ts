import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

import OrderSales from 'App/Models/SalesOrder'
import CashFlow from 'App/Models/CashFlow'
import OrderItem from 'App/Models/OrderItem'
import Stock from 'App/Models/Stock'

const calcTotals = (items: any) => {
  let totalValue = 0;
  items.map((item: any) => totalValue = totalValue + (item.qtdserverd * item.inputvalue))
  return totalValue;
}

export default class NfesController {
  
  public async store({ request }: HttpContextContract) {
    const idOrder = request.input('id')
    const data = request.except(['id', 'inputnf'])

    const items = request.input('inputnf')

    const order = await OrderSales.findByOrFail('id', idOrder)
    const dataOrder = Object.fromEntries(Object.entries(data).filter((item) => item[1] !== ''));
    
    order.merge(dataOrder).save()

    const checkItemsQtdServerd = items.filter((item: any) => item.qtdserverd.length > 0)
    
    if (checkItemsQtdServerd.length > 0) {
      // Atualização Itens
      await Promise.all(items.map(async (element: any) => {
        const itemUpdate = await OrderItem.findByOrFail('id', element.id)
        await itemUpdate.merge({qtdserverd: element.qtdserverd ?? 0}).save()
      }));

      // Atualização Fluxo de Caixa
      const flowProvider = await CashFlow.query()
      .where('order_id', order.id)
      .where('provider_id', order.provider_id)
      
      const newItems = await OrderItem.query().where('order_id', idOrder);
      await flowProvider[0].merge({value: calcTotals(newItems) }).save()
    }

    // Atualização de Estoque
    const newItems = await OrderItem.query().where('order_id', idOrder);
    await Promise.all(newItems.map(async (element: any) => {
      await Stock.create({
        product_id: element.product_id,
        volume: element.qtdserverd ?? element.qtdrequested,
        type_id: 9,
        order_id: element.order_id,
      })
    }));

    const response = await OrderSales.query().where('id', idOrder).preload('order_items')

    return response[0]

  }


  public async update({ params, request }: HttpContextContract) {

    const dataOrder = request.only(['nfe', 'dof', 'dare'])
  
    const items = request.input('outputnf')
    const checkItemsQtdServerd = items.filter((item: any) => item.outputvalue.length > 0) 

    if (checkItemsQtdServerd.length > 0) {
      // Atualização Itens
      await Promise.all(items.map(async (element: any) => {
        const itemUpdate = await OrderItem.findByOrFail('id', element.id)
        await itemUpdate.merge({outputvalue: element.outputvalue ?? 0}).save()
      }));
    }

    const newItems = await OrderItem.query().where('order_id', params.id);


    // Atualização de Estoque
    await Promise.all(newItems.map(async (element: any) => {
      await Stock.create({
        product_id: element.product_id,
        volume: element.qtdserverd ?? element.qtdrequested,
        type_id: 10,
        order_id: element.order_id,
      })
    }));

    // Atualização do Pedido
    const order = await OrderSales.query().where('id', params.id).preload('order_items')
    order[0].merge(dataOrder).save()

    // Criação flow cliente
    await CashFlow.create({
      value: newItems.reduce(
        (acumulador: number, valorAtual: any) => 
        { return acumulador + ((valorAtual.qtdserverd ?? valorAtual.qtdrequested) 
          * (valorAtual.outputvalue ?? valorAtual.inputvalue))
        }, 0), 
      type_id: 8,
      provider_id: order[0].client_id,
      order_id: params.id,
      duedate: format(new Date(), 'yyyy/MM/dd'),
    })

    return order[0]
  }
}
