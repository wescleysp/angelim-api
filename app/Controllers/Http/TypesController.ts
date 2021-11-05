import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Type from 'App/Models/Type'


export default class TypesController {
  public async index () {
    return await Type.all()
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.all()
    const type = await Type.create(data)
    return type
  }
}


