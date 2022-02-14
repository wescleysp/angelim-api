import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { format } from 'date-fns'

import CashFlow from 'App/Models/CashFlow'

export default class ExpensesController {
  public async store({ request }: HttpContextContract) {
    const order_id = request.input('order_id')
    const dataExpense = request.input('dataExpense')

    const check = await CashFlow.query().where('order_id', order_id).whereNull('provider_id')
    if (check.length > 0) {
      await Promise.all(check.map(async (element: any, idx: number) => {
        await check[idx].delete()
      }))
    }

    dataExpense.forEach((item: any) => { delete item.id })

    await Promise.all(dataExpense.map(async (element: any) => {
      await CashFlow.create({
        value: element.value,
        type_id: 7,
        order_id: order_id,
        description: element.description,
        duedate: element.duedate
      })
    }));
  }

  public async show({ params }: HttpContextContract) {
    const expenses = await CashFlow.query().where('order_id', params.id).whereNull('provider_id')
    let responseData: any = [];
    await Promise.all(expenses.map(async (element: any, idx: number) => {
      let data = expenses[idx].serializeAttributes()
      data.duedate = format(data.duedate, 'yyyy-MM-dd')
      responseData.push(data)
    }));

    return responseData
  }

}
