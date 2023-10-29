import prismaClient from "../../prisma";

interface OrderRequest{
    table_id: string;
}

class RemoveTableService{
    async execute({table_id} : OrderRequest){

        const number = parseInt(table_id)


        const tables = await prismaClient.table.delete({
            where:{
                id: number,
            }
        })

        return tables;
    }
}

export {RemoveTableService}