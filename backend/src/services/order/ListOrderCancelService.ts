import prismaClient from "../../prisma";


class ListOrderCancelService{
    async execute(){

        const orders = await prismaClient.order.findMany({
            where:{
                status: "Cancelado"
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        return orders
    }
}

export {ListOrderCancelService}