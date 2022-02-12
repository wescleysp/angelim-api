import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

import Duty from 'App/Models/Duty'
import CashFlow from 'App/Models/CashFlow'

export default class DutiesController {
  public async store ({ request }: HttpContextContract) {
    const { duties } = request.all()
    const dataDuties = duties.map(item => Object.fromEntries(Object.entries(item).filter((prop) => prop[1] !== '')))
    await Duty.createMany(dataDuties);

    // Movimentação Fluxo de Caixa
    await Promise.all(duties.map(async (element: any) => {
      await CashFlow.create({
        value: (element.value - element.discount),
        type_id: 7,
        provider_id: element.provider_id,
        order_id: element.order_id,
        duedate: format(new Date(), 'yyyy/MM/dd')
      })
    }))
    
  }

  public async show ({ params }: HttpContextContract) {
    const response = await Duty.query().where('order_id', params.id)
    const data = {duties: response}
    return data
  }

  public async update ({ params, request }: HttpContextContract) {
    const data = await Duty.query().where('order_id', params.id)
    
    //  Exclusão Dados Antigos
    await Promise.all(data.map(async (element: any, idx: number) => {
       await CashFlow.query()
       .where('order_id', element.order_id)
       .where('provider_id', element.provider_id)
       .where('value', (element.value - element.discount))
       .delete()

       await data[idx].delete()
    }))

    // Inclusão Novos Dados
    const { duties } = request.all()
    const dataDuties = duties.map(item => Object.fromEntries(Object.entries(item).filter((prop) => prop[1] !== '')))
    await Duty.createMany(dataDuties);

    // Movimentação Fluxo de Caixa
    await Promise.all(duties.map(async (element: any) => {
      await CashFlow.create({
        value: (element.value - element.discount),
        type_id: 7,
        provider_id: element.provider_id,
        order_id: element.order_id,
        duedate: format(new Date(), 'yyyy/MM/dd')
      })
    }))
  }

}
