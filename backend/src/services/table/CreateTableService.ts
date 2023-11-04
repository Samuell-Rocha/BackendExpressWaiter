import prismaClient from "../../prisma";

interface TableRequest {
    table_id: string;
    qrcode: string;
    nameqrcode: string
}

class CreateTableService {
    async execute({table_id, qrcode, nameqrcode}: TableRequest) {


       const number = parseInt(table_id)

        const tableAlreadyExists = await prismaClient.table.findFirst({
            where: {
                id: number
            }
        })

        if (tableAlreadyExists) {
            throw new Error("Mesa ja Cadastrada")
        }
        
        const tables = await prismaClient.table.create({
            data: {
                id: number,
                qrcode: qrcode,
                nameqrcode: nameqrcode
            }
        })

        return tables

    }
}

export { CreateTableService }