import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Person from 'App/Models/Person'
import Type from 'App/Models/Type'

export default class ProvidersController {

  public async getProvidersByType ({ params }: HttpContextContract) {
    const response = await Person.query().where('logical_delete', 0).where('type_id', 2).where('provider_type', params.id)
    let responseData: any = [];

    await Promise.all(response.map(async (element, idx) => {
      let data = response[idx].serializeAttributes()
      !!element.provider_type && (data.type_name = (await Type.findByOrFail('id', element.provider_type)).description)
      responseData.push(data)
    }));
    
    return responseData
  }

  public async index () {
    const response = await Person.query().where('logical_delete', 0).where('type_id', 2)
    let responseData: any = [];

    await Promise.all(response.map(async (element, idx) => {
      let data = response[idx].serializeAttributes()
      !!element.provider_type && (data.type_name = (await Type.findByOrFail('id', element.provider_type)).description)
      responseData.push(data)
    }));
    
    return responseData
  }

  public async show ({ params }: HttpContextContract) {
    return await Person.findByOrFail('id', params.id)
  }
}
