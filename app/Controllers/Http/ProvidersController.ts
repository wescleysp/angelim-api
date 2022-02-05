import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person'

export default class ProvidersController {
  public async index () {
    const response = await Person.query().where('type_id', 2)
    return response
  }

  public async show ({ params }: HttpContextContract) {
    return await Person.findByOrFail('id', params.id)
  }
}
