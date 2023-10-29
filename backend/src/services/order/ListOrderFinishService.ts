import prismaClient from "../../prisma";

class ListOrderFinishService{
    async execute(){

        const orders = await prismaClient.order.findMany({
            where:{
                status: 'Pedido Finalizado'
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        return orders
    }
}

export {ListOrderFinishService}