import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

import Transport from 'App/Models/Transport'
import CashFlow from 'App/Models/CashFlow'
import OrderItem from 'App/Models/OrderItem'
import Person from 'App/Models/Person'

export default class TransportsController {
  public async store({ request }: HttpContextContract) {
    const order_id = request.input('order_id');
    const dataTransport = request.input('dataTransport')

    const orderItems = await OrderItem.query().where('order_id', order_id)
    const TotalM3Items = orderItems.reduce((count: number, value: any) => {
      return count + (value.qtdserverd ?? value.qtdrequested)
    }, 0)

    dataTransport.forEach((transport: any) => {
      delete transport.id
      delete transport.name_provider
      transport.order_id = order_id
      transport.loading.length === 0 && delete transport.loading
    })

    await Transport.createMany(dataTransport)
    

    // Movimentação de caixa
    await Promise.all(dataTransport.map(async (element: any) => {
      await CashFlow.create({
        value: (element.valuemeters * TotalM3Items) + parseFloat(element.loading ?? 0),
        type_id: 7,
        provider_id: element.provider_id,
        order_id: order_id,
        duedate: format(new Date(), 'yyyy/MM/dd')
      })
    }));

  }

  public async show({ params }: HttpContextContract) {
    const transport = await Transport.query().where('order_id', params.id)
    let responseData: any = [];
    await Promise.all(transport.map(async (element: any, idx: number) => {
      let data = transport[idx].serializeAttributes()
      data.date_origin = format(data.date_origin, 'yyyy-MM-dd')
      data.date_destiny = format(data.date_destiny, 'yyyy-MM-dd')
      data.name_provider = (await Person.findByOrFail('id', element.provider_id)).name
      responseData.push(data)
    }));

    return responseData
  }

  public async update({ params, request }: HttpContextContract) {
    await Transport.query().where('order_id', params.id).delete()

    const dataTransport = request.input('dataTransport')

    const orderItems = await OrderItem.query().where('order_id', params.id)
    const TotalM3Items = orderItems.reduce((count: number, value: any) => {
      return count + (value.qtdserverd ?? value.qtdrequested)
    }, 0)

    dataTransport.forEach((transport: any) => {
      delete transport.id
      delete transport.name_provider
      delete transport.created_at
      delete transport.updated_at
      delete transport.name_provider
      transport.order_id = params.id
      !transport.loading && delete transport.loading
    })

    await Transport.createMany(dataTransport)
    

    // Movimentação de caixa
    await Promise.all(dataTransport.map(async (element: any) => {
      await CashFlow.query().where('order_id', params.id).where('provider_id', element.provider_id).delete()
      
      await CashFlow.create({
        value: (element.valuemeters * TotalM3Items) + parseFloat(element.loading ?? 0),
        type_id: 7,
        provider_id: element.provider_id,
        order_id: params.id,
        duedate: format(new Date(), 'yyyy/MM/dd')
      })
    }));
  }
}
