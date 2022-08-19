import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

import CashFlow from 'App/Models/CashFlow'

export default class ClearingAccountsController {

  public async store ({ request }: HttpContextContract) {
    const origem = request.input('origem')
    const destiny = request.input('destiny')

    //Movimentação Origem
    const dataOrigem = {
      provider_id: origem.provider_id,
      value: origem.value,
      type_id: 8,
      status: 1,
      duedate: format(new Date(), 'yyyy/MM/dd'),
      description: origem.description
    }
    await CashFlow.create(dataOrigem)

    //Movimentação Destino
    const dataDestiny = {
      provider_id: destiny.provider_id,
      value: destiny.value,
      type_id: 7,
      status: 1,
      duedate: format(new Date(), 'yyyy/MM/dd'),
      description: destiny.description
    }
    await CashFlow.create(dataDestiny)
  }
}
