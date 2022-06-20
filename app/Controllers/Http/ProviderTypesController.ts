// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Type from 'App/Models/Type'

export default class ProviderTypesController {
  public async index () {
    return await Type.query().where('parent_id', 2)
  }

}
