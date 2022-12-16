import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CashFlow from 'App/Models/CashFlow'
import Person from 'App/Models/Person'
import Type from 'App/Models/Type'

export default class AccountsController {
  protected async calculateMovements (type: any, idProvider: number) {
    let response = {
      total: 0,
      pending: 0,
      done: 0,
    }

    const dataFlows = await CashFlow.query()
      .where('provider_id', idProvider)
      .where('type_id', type)
      .where('logical_delete', 0)
    
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

  public async index ({}: HttpContextContract) {
    let responseData: any = [];
    const providers = await Person.query().where('logical_delete', 0)

    await Promise.all(providers.map(async (element) => {
      let data = element.serializeAttributes()
      
      data.type_name = (await Type.findByOrFail('id', element.type_id)).description
      !!element.provider_type && (data.provider_name = (await Type.findByOrFail('id', element.provider_type)).description)
      
      data.payable = await this.calculateMovements(7, data.id) //Movimentações a pagar
      data.receivable =  await this.calculateMovements(8, data.id) //Movimentações a receber

      responseData.push(data)
    }));

    return responseData
  }

  public async show ({}: HttpContextContract) {}



}
