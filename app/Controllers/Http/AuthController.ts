import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthModel from 'App/Models/AuthModel';

export default class AuthController {

  public async store ({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      const { token } = await auth.use('api').attempt(email, password)
      const user = await AuthModel.findByOrFail('email', email)
      return {token, user: user.username}
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
