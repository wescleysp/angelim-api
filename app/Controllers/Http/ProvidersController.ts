import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Person from 'App/Models/Person'
import Type from 'App/Models/Type'


export default class ProvidersController {
  public async index () {
    const response = await Person.query().where('type_id', 2)
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
