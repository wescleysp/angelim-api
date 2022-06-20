import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Person from 'App/Models/Person'
import Adress from 'App/Models/Adress'
import Type from 'App/Models/Type'

export default class PeopleController {
    public async index () {
      const person = await Person.query().preload('adresses')
      let responseData: any = [];

      await Promise.all(person.map(async (element, idx) => {
        let data = person[idx].serializeAttributes()
        data.name_type = (await Type.findByOrFail('id', element.type_id)).description
        !!element.provider_type && (data.name_provider = (await Type.findByOrFail('id', element.provider_type)).description)
        responseData.push(data)
      }));
      
      return responseData
    }

    public async store ({ request }: HttpContextContract) {

        const data = request.except(['adresses'])
        const adresses = request.input('adresses')

        const person = await Person.create(data)
        adresses.type_id = 3

        await person.related('adresses').create(adresses)

        return person
    }

    public async update ({ params, request }: HttpContextContract) {
       const person = await Person.findByOrFail('id', params.id);
       const adress = await Adress.findByOrFail('person_id', params.id);

       const dataPerson = request.except(['adresses'])
       const dataAdress = request.input('adresses')

       await person.merge(dataPerson).save()
       await adress.merge(dataAdress).save()
    }

    public async destroy ({ params }: HttpContextContract) {
      const person = await Person.findByOrFail('id', params.id);
      await person.delete();
   }
       
}
