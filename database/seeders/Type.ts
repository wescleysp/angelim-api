import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Type from 'App/Models/Type'

export default class TypeSeeder extends BaseSeeder {
  public async run () {

    await Type.createMany([
      {
        description: 'cliente',
        table: 'people',
      },
      {
        description: 'fornecedor',
        table: 'people'
      },
      {
        description: 'comercial',
        table: 'adresses'
      },
      {
        description: 'residencial',
        table: 'adresses'
      },
      {
        description: 'serrado',
        table: 'products'
      },
      {
        description: 'em tora',
        table: 'products'
      },
      {
        description: 'a pagar',
        table: 'cash_flows'
      }
      ,
      {
        description: 'a receber',
        table: 'cash_flows'
      }
      ,
      {
        description: 'entrada',
        table: 'stocks'
      }
      ,
      {
        description: 'saida',
        table: 'stocks'
      },
      {
        description: 'terrestre',
        table: 'transports'
      },
      {
        description: 'marítimo',
        table: 'transports'
      }
    ])
  }
}
