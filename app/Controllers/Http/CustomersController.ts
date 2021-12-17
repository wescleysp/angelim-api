// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person'

export default class CustomersController {
  public async index () {
    const response = await Person.query().where('type_id', 1)
    return response
  }
}
