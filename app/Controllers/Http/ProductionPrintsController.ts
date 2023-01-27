import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import fs from 'fs'
import { format } from 'date-fns'
import { getCnpjMask } from '../../shared/maskCpfCnpj'

import ProductionOrders from 'App/Models/ProductionOrder'
import OrderSales from 'App/Models/SalesOrder'
import Person from 'App/Models/Person'
import Product from 'App/Models/Product'

export default class ProductionPrintsController {
  public async show({ params, response }: HttpContextContract) {
    let client
    let bodyItems = []

    const productionOrders = await ProductionOrders.query()
      .where('order_id', params.id)
      .preload('production_items')
    const provider = await Person.query()
      .where('id', productionOrders[0].provider_id)
      .preload('adresses')
    const order = await OrderSales.findByOrFail('id', params.id)
    order.client_id &&
      (client = await Person.query().where('id', order.client_id).preload('adresses'))

    await Promise.all(
      productionOrders[0].production_items.map(async (element, idx) => {
        let data = element.serializeAttributes()
        const row = new Array()
        row.push(idx + 1)
        row.push((await Product.findByOrFail('id', data.product_id)).name)
        row.push(data.amount)
        row.push(data.unity ?? 'm³')
        row.push(data.description)
        bodyItems.push(row)
      })
    )

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    }

    const printer = new PdfPrinter(fonts)

    const docDefinitions: TDocumentDefinitions = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'PEDIDO',
                  alignment: 'center',
                  fontSize: 23,
                  bold: true,
                  border: [false, true, false, true],
                  margin: [0, 10, 0, 10],
                },
                {
                  text: `Nº ${productionOrders[0]?.id}`,
                  alignment: 'center',
                  fontSize: 18,
                  bold: true,
                  border: [false, true, false, true],
                  margin: [0, 12, 0, 10],
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                {
                  style: 'subHeader',
                  table: {
                    body: [
                      ['Cliente:', client ? client[0].name : '--'],
                      [
                        'Endereço:',
                        client ? `${client[0].adresses.city}/${client[0].adresses.state}` : '--',
                      ],
                      ['CNPJ:', client ? getCnpjMask(client[0].cpfcnpj) : '--'],
                    ],
                  },
                  layout: 'noBorders',
                  border: [false, false, false, true],
                  margin: [0, 0, 0, 0],
                },
                {
                  style: 'subHeader',
                  table: {
                    body: [
                      [
                        'Data:',
                        format(productionOrders[0]?.production_date, 'dd/MM/yyyy') ??
                          format(new Date(), 'yyyy/MM/dd'),
                      ],
                      ['Serraria:', provider[0]?.name],
                      ['UF:', provider[0]?.adresses?.state],
                      ['Insc. Est.:', provider[0]?.ie ?? '--'],
                    ],
                  },
                  layout: 'lightHorizontalLines',
                  border: [true, false, false, true],
                  margin: [0, 0, 0, 0],
                },
              ],
            ],
          },
        },
        {
          style: 'tableItems',
          table: {
            widths: [30, 90, 50, 50, '*'],
            headerRows: 1,
            body: [
              [
                { text: 'Item', style: 'subHeader' },
                { text: 'Espécie', style: 'subHeader' },
                { text: 'Qtd.', style: 'subHeader' },
                { text: 'Und.', style: 'subHeader' },
                { text: 'Descrição do Produto', style: 'subHeader' },
              ],
              ...bodyItems,
            ],
          },
          layout: {
            paddingTop: function () {
              return 4
            },
            paddingBottom: function () {
              return 4
            },
          },
        },
        {
          style: 'tableItems',
          table: {
            widths: [30, 90, 50, 50, '*'],
            body: [
              [
                '',
                'Total',
                productionOrders[0].production_items.reduce(
                  (acumulador: number, valorAtual: any) => {
                    return acumulador + valorAtual.amount
                  },
                  0
                ),
                'm³',
                '',
              ],
            ],
          },
          layout: {
            paddingTop: function () {
              return 4
            },
            paddingBottom: function () {
              return 4
            },
          },
        },
        {
          style: 'tableItems',
          table: {
            widths: [50, 50, '*'],
            body: [['Cond. Pag.', productionOrders[0]?.payment_type ?? 'A Vista', '']],
          },
          layout: {
            paddingTop: function () {
              return 4
            },
            paddingBottom: function () {
              return 4
            },
          },
        },
        {
          style: 'obs',
          table: {
            widths: [110, '*'],
            body: [['Observações Produção:', productionOrders[0]?.obs ?? '--']],
          },
          layout: {
            paddingTop: function () {
              return 4
            },
            paddingBottom: function () {
              return 4
            },
          },
        },
        {
          style: 'alerts',
          table: {
            widths: [300, '*'],
            body: [
              ['MANDAR A MADERIA BEM BITOLADA', ''],
              ['MADEIRA SEM BROCA', ''],
              ['MADEIRA SEM CASCA', 'FAVOR NÃO ALTERAR O PEDIDO'],
              ['MADEIRA SEM RACHADURA', ''],
              ['MADEIRA SEM NÓ', ''],
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        subHeader: {
          fontSize: 11,
          bold: true,
        },
        tableItems: {
          margin: [0, 10, 0, 0],
          alignment: 'center',
          fontSize: 10,
        },
        alerts: {
          margin: [0, 10, 0, 0],
          alignment: 'center',
          fontSize: 9,
          bold: true,
        },
        obs: {
          margin: [0, 10, 0, 35],
          alignment: 'left',
          fontSize: 10,
        },
      },
      defaultStyle: {
        font: 'Helvetica',
      },
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinitions)

    pdfDoc.pipe(fs.createWriteStream('document.pdf'))
    pdfDoc.end()

    const sendDoc = fs.createReadStream('document.pdf')
    response.stream(sendDoc)
  }
}
