import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'


export default class ProductsController {
  public async index() {
    return await Product.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.all()
    const checkProduct = await Product.query().where('name', data.name).where('type_id', data.type_id)

    if(checkProduct.length !== 0) {
      return response.status(422)
    }

    const product = await Product.create(data)
    return product
  }

  public async show ({ params }: HttpContextContract) {
    return await Product.query().where('logical_delete', params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id);
    const data = request.all()
    await product.merge(data).save()
  }

  public async destroy({ params }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id);
    await product.merge({logical_delete: true}).save();
  }
}
