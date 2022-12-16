import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CashFlow from 'App/Models/CashFlow'
import Person from 'App/Models/Person'
import SalesOrder from 'App/Models/SalesOrder'


export default class CashFlowsController {
  public async index() {
    let flows = await CashFlow.query().where('logical_delete', 0).orderBy('created_at', 'desc')
    let responseData: any = [];

    await Promise.all(flows.map(async (element, idx) => {
      let data = flows[idx].serializeAttributes()
      !!element.provider_id && (data.name_provider = (await Person.findByOrFail('id', element.provider_id)).name)
      !!element.order_id && (data.order_code = (await SalesOrder.findByOrFail('id', element.order_id)).code)
      responseData.push(data)
    }))

    return responseData
  }

  public async store({ request }: HttpContextContract) {
    const dataFlow = request.all()
    await CashFlow.create(dataFlow)
  }

  public async show({ params }: HttpContextContract) {
    let flows = await CashFlow.query().where('provider_id', params.id).where('logical_delete', 0).orderBy('created_at', 'desc')
    const nameProvider = (await Person.findByOrFail('id', params.id)).name

    let dataFlow: any = [];

    await Promise.all(flows.map(async (element, idx) => {
      let data = flows[idx].serializeAttributes()
      !!element.order_id && (data.order_code = (await SalesOrder.findByOrFail('id', element.order_id)).code)
      dataFlow.push(data)
    }))

    const responseData = {
      nameProvider,
      dataFlow
    }

    return responseData
  }
  
  public async update({ params }: HttpContextContract) {
    const flow = await CashFlow.findByOrFail('id', params.id)
    flow.merge({status: 1}).save()
  }

}
