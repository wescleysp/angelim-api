import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

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
    }));

    return responseData
  }

  public async store({ request }: HttpContextContract) {
    const dataFlow = request.all()
    dataFlow.duedate = format(new Date(), 'yyyy/MM/dd')
    await CashFlow.create(dataFlow)
  }
  
  public async update({ params }: HttpContextContract) {
    const flow = await CashFlow.findByOrFail('id', params.id)
    flow.merge({status: 1}).save()
  }

}
