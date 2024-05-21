import fastify from 'fastify'
import { createPDF } from './generate-pdf'

export const app = fastify()

app.get('/',async (request, reply) => {
  return reply.status(200).send({
    message: "teste OK"
  })
})

app.post('/api/generate-pdf',async (request, reply) => {
  const content = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Relatório de Movimentações</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 32px; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1 { font-size: 32px; }
        h2 { font-size: 16px; }
        section { padding: 64px; background-color: rgb(71, 153, 235); }
      </style>
    </head>

    <body>
      <div style="margin-bottom: 24px; display: flex; flex-direction: column; gap: 4px;">   
      </div>

      <table>
        <tr>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Tipo</th>
          <th>Data</th>
          <th>Status</th>
          <th>Valor</th>
        </tr>
      </table>
    </body>
  </html>
  `;
  
  const file = await  createPDF({ content })

  return reply
    .header('Content-Type', 'application/octet-stream')
    .header(
      'Content-Disposition',
      `attachment; filename="file.pdf"`,
    ).type(`application/pdf`)
    .send(file)
});