import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CashFlow from 'App/Models/CashFlow'
import Person from 'App/Models/Person'
import { format } from 'date-fns'

export default class DashCashesController {
  public async index() {
    let flows = await CashFlow.query()
      .where('type_id', 7)
      .where('logical_delete', 0)
      .where((query) => {
        query
        .where('created_at', '>=', `${format(new Date(), 'yyyy-MM')}-01`)
        .orWhere('created_at', '<=', `${format(new Date(), 'yyyy-MM')}-31`)
      })
      .orderBy('created_at', 'desc')
    
    let responseData: any = [];

    await Promise.all(flows.map(async (element, idx) => {
      let data = flows[idx].serializeAttributes()
      !!element.provider_id && (data.name_provider = (await Person.findByOrFail('id', element.provider_id)).name)
      responseData.push(data)
    }));

    return responseData
  }

  public async show({ params }: HttpContextContract) {
    let response = {
      total: 0,
      pending: 0,
      done: 0,
    }

    const dataFlows = await CashFlow.query()
      .where('type_id', params.id)
      .where('logical_delete', 0)
      .where((query) => {
        query
        .where('created_at', '>=', `${format(new Date(), 'yyyy-MM')}-01`)
        .orWhere('created_at', '<=', `${format(new Date(), 'yyyy-MM')}-31`)
      })
    
    const pending = dataFlows.filter(item => item.status === 0)
    const done = dataFlows.filter(item => item.status === 1)

    dataFlows.length > 0 && (response.total = dataFlows.reduce(
      (count: number, currentValue: any) => { return count + currentValue.value }, 0))

    pending.length > 0 && (response.pending = pending.reduce(
      (count: number, currentValue: any) => { return count + currentValue.value }, 0))

    done.length > 0 && (response.done = done.reduce(
      (count: number, currentValue: any) => { return count + currentValue.value }, 0))

    return response
  }
}
