import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

import Nfe from 'App/Models/Nfe'
import Stock from 'App/Models/Stock'
import CashFlow from 'App/Models/CashFlow'

const calcTotals = (items: any) => {
  return items.reduce((acumulador: number, item: any) => { return acumulador + (item.amount * item.value) }, 0)

}
export default class NfesController {

  public async getNfe(id: number) {
    return await Nfe.query().where('project_id', id).preload('nfe_items')
  }


  public async store ({ request }: HttpContextContract) {
    const dataNfe = request.except(['nfe_items', 'farm_id'])
    const items = request.input('nfe_items')
    const farmId = request.input('farm_id')

    const nfe = await Nfe.create(dataNfe)
    await nfe.related('nfe_items').createMany(items)


    //----Movimentação de Stock----
    const dataStock = items.map((item: any) => {
      return {
        nfe_id: nfe.id,
        product_id: item.product_id,
        volume: item.amount,
        type_id: 9,
        project_id: dataNfe.project_id,
        place_id: dataNfe.destiny_id,
      }
    })

    await Stock.createMany(dataStock)


    //----Movimentação Financeira----
    //Fazenda
    const farm = {
      nfe_id: nfe.id,
      provider_id: farmId,
      project_id: dataNfe.project_id,
      value: calcTotals(items),
      type_id: 7,
      duedate: format(new Date(), 'yyyy/MM/dd')
    }
    await CashFlow.create(farm)

    //Transporte
    const transport = {
      nfe_id: nfe.id,
      provider_id: dataNfe.transport_id,
      project_id: dataNfe.project_id,
      value: dataNfe.transport_value,
      type_id: 7,
      duedate: format(new Date(), 'yyyy/MM/dd')
    }
    await CashFlow.create(transport)

    return this.getNfe(dataNfe.project_id)
  }

  public async destroy ({}: HttpContextContract) {
  }
}
