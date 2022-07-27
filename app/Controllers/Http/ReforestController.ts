import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

import Reforestation from 'App/Models/Reforestation'
import CashFlow from 'App/Models/CashFlow'

export default class ReforestController {
  public async index ({}: HttpContextContract) {
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.all()
    Reforestation.create(data);

    //----Movimentação Financeira----
    const provReforest = {
      provider_id: data.provider_id,
      project_id: data.project_id,
      value: data.amount * data.value,
      type_id: 7,
      duedate: format(new Date(), 'yyyy/MM/dd')
    }
    await CashFlow.create(provReforest)

  }


  public async show ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
