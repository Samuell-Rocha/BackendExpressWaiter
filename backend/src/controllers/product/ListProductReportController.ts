import { NextFunction, Request, Response } from "express";
import prismaClient from "../../prisma";

import PdfPrinter from "pdfmake";
import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";

import fs from "fs";

export class ListProductReportController {
  async handle(request: Request, response: Response) {
    const products = await prismaClient.product.findMany();

    const date = new Date().toLocaleString();

    const fonts = {
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };

    const printer = new PdfPrinter(fonts);
    const body = [];

    const columnsTitle: TableCell[] = [
      { text: "Name", style: "name" },
      { text: "Descrição", style: "columnsTitle" },
      { text: "Preço", style: "columnsTitle" },
      { text: "Tempo de Preparo", style: "columnsTitle" },
    ];

    const columnsBody = new Array();

    columnsTitle.forEach((column) => columnsBody.push(column));
    body.push(columnsBody);

    for await (let product of products) {
      const rows = new Array();

      rows.push(product.name);
      rows.push(product.description);
      rows.push(`R$ ${Number(product.price.toString()).toFixed(2)}`);
      rows.push(product.estimated_time);

      body.push(rows);
    }

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: "Helvetica" },
      content: [
        {
          columns: [
            { text: "Relatório de Produtos", style: "header" },
            { text: date + "\n\n", style: "header" },
          ],
        },
        {
          table: {
            headerRows: 1,
            widths: [130, "auto", 80, "auto"],

            body,
          },
        },
      ],
  
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
        },
        columnsTitle: {
          fontSize: 13,
          bold: true,
          fillColor: "#7159c1",
          color: "#FFF",
          alignment: "center",
          margin: 4,
        },
        name:{
          fillColor: "#999",
          color: "#FFF",
          alignment: "center",
          margin: 4,
        },
      },
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinitions);
    const pdfName = "Relatorio.pdf";
    /*
    pdfDoc.pipe(fs.createWriteStream(pdfName))
        .on('end', function () {
            response.setHeader('Content-Type', 'application/pdf');
            response.download(pdfName, pdfName, (err) => { });
        });

    pdfDoc.end(); 
    */

    pdfDoc.save()
    const chunks = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });
    pdfDoc.end();

    pdfDoc.on("end", async () => {
      const result = Buffer.concat(chunks);
     
      response.end(result);
       
    });
  }
}
