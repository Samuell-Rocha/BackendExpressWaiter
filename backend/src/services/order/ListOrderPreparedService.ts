import prismaClient from "../../prisma";

class ListOrderPreparedService{
    async execute(){

        const orders = await prismaClient.order.findMany({
            where:{
                status: 'Pedido Pronto'
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        return orders
    }
}

export {ListOrderPreparedService}