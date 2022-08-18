import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { format } from 'date-fns'

import FarmProject from 'App/Models/FarmProject'
import Nfe from 'App/Models/Nfe'
import Reforestation from 'App/Models/Reforestation'
import CashFlow from 'App/Models/CashFlow'
import Stock from 'App/Models/Stock'

export default class FarmProjectsController {
  
  public async getFarmProject(id?: number) {

    const responseData = []
    const farmProject = id
      ?  await FarmProject.query().where('id', id).preload('project_items')
      : await FarmProject.query().preload('project_items')
    

    await Promise.all(farmProject.map(async (element) => {
      let data = element.serializeAttributes()
      data.project_items = []
      data.provider_name = (await Database.from('people').select('name').where('id', '=', element.provider_id))[0].name
      data.nfe = await Nfe.query().where('project_id', element.id).preload('nfe_items')
      data.reforest = (await Reforestation.query().where('project_id', element.id))[0]
      data.start_date = format(data.start_date, 'yyyy-MM-dd')
      data.end_date = format(data.end_date, 'yyyy-MM-dd')
      
      await Promise.all(element.project_items.map(async (itm) => {
        let item = itm.serializeAttributes()
        item.product_name = (await Database.from('products').select('name').where('id', '=', itm.product_id))[0].name
        data.project_items.push(item)
      }))
      responseData.push(data)
    }));

    return id ? responseData[0] : responseData;
  }

  public async index ({}: HttpContextContract) {
    return this.getFarmProject()
  }

  public async store ({ request }: HttpContextContract) {
    const dataProject = request.except(['project_items'])
    const items = request.input('project_items')

    const farmProject = await FarmProject.create(dataProject)
    await farmProject.related('project_items').createMany(items)

    return this.getFarmProject(farmProject.id)
  }

  public async destroy ({ params }: HttpContextContract) {
    const farmProject = await FarmProject.findByOrFail('id', params.id)
    farmProject.merge({logical_delete: 1}).save()

    const nfe = await Nfe.query().where('project_id', params.id)
    nfe.forEach((item, idx) => {
      nfe[idx].merge({logical_delete: 1}).save()
    })

     // Canecelamento Fluxo de Caixa
     const cashFlow = await CashFlow.query().where('project_id', params.id)
     cashFlow.forEach((item, idx) => {
       cashFlow[idx].merge({logical_delete: 1}).save()
     })
 
     // Canecelamento Estoque
     const stock = await Stock.query().where('project_id', params.id)
     stock.forEach((item, idx) => {
       stock[idx].merge({logical_delete: 1}).save()
     })
  }
}
