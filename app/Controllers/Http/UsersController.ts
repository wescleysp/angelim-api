import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthModel from 'App/Models/AuthModel';

export default class UsersController {
  public async store ({ request }: HttpContextContract) {
    const data = request.all()
    const user = await AuthModel.create(data)
    return user
  }
}
