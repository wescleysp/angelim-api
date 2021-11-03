import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'


export default class ProductsController {
  public async index () {
    return await Product.all()
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.all()
    const product = await Product.create(data)
    return product
  }

  public async update ({ params, request }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id);
    const data = request.all()
    await product.merge(data).save()
 }

 public async destroy ({ params }: HttpContextContract) {
   const product = await Product.findByOrFail('id', params.id);
   await product.delete();
}
}
