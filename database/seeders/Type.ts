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
      },
      {
        description: 'Serraria',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Fazenda',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Toreiro',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Motorista',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Carregador',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Transportadora',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Balsa',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Posto de Gasolina',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Representante',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Extrator',
        table: 'people',
        parent_id: 2
      },
      {
        description: 'Manejo',
        table: 'farm_projects'
      },
      {
        description: 'Corte Raso',
        table: 'farm_projects'
      },
      {
        description: 'Reflorestamento',
        table: 'people',
        parent_id: 2
      },
    ])
  }
}
