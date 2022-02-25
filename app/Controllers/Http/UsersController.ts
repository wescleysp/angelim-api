import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthModel from 'App/Models/AuthModel';

export default class UsersController {
  public async index() {
    return await AuthModel.all()
  }

  public async store({ request }: HttpContextContract) {
    const data = request.all()
    delete data.password_confirmed;
    const user = await AuthModel.create(data)
    return user
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await AuthModel.findByOrFail('id', params.id);
    const data = request.all()
    delete data.password_confirmed;
    await user.merge(data).save()
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await AuthModel.findByOrFail('id', params.id);
    await user.delete();
  }
}
