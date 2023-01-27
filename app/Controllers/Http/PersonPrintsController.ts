import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import fs from 'fs'
import { getCnpjMask } from '../../shared/maskCpfCnpj'
import VMasker from 'vanilla-masker'

import Person from 'App/Models/Person'

export default class PersonPrintsController {
  public async show({ params, response }: HttpContextContract) {
    const person = await Person.query().where('id', params.id).preload('adresses')

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
      pageOrientation: 'portrait',
      content: [
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'CADASTRO CLIENTE/FORNECEDOR',
                  alignment: 'center',
                  fontSize: 14,
                  bold: true,
                  border: [false, true, false, true],
                  margin: [0, 10, 0, 10],
                },
                {
                  text: `Nº ${person[0].id}`,
                  alignment: 'center',
                  fontSize: 14,
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
            widths: [150, '*'],
            body: [
              ['Nome:', person[0].name ?? '--'],
              ['Apelido:', person[0].surname ?? '--'],
              ['E-mail:', person[0].email ?? '--'],
              ['CPF/CNPJ:', getCnpjMask(person[0].cpfcnpj) ?? '--'],
              ['IE:', person[0].ie ?? '--'],
              ['Telefone:', VMasker.toPattern(person[0].phone, '(99) 9999-9999') ?? '--'],
              ['Celular:', VMasker.toPattern(person[0].cellphone, '(99) 99999-9999') ?? '--'],
              [
                'Endereço:',
                `${person[0].adresses.street}, ${person[0].adresses.number}, ${
                  person[0].adresses.complement
                }, ${person[0].adresses.district}, ${person[0].adresses.city}/${
                  person[0].adresses.state
                }, ${VMasker.toPattern(person[0].adresses.cep, '99999-999')}`,
              ],
            ],
          },
          layout: {
            paddingTop: function () {
              return 5
            },
            paddingBottom: function () {
              return 5
            },
          },
          margin: [0, 20, 0, 0],
        },
      ],
      defaultStyle: {
        font: 'Helvetica',
      },
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinitions)

    pdfDoc.pipe(fs.createWriteStream('person.pdf'))
    pdfDoc.end()

    const sendDoc = fs.createReadStream('person.pdf')
    response.stream(sendDoc)
  }
}
