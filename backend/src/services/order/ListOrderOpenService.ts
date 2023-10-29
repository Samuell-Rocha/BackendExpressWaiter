import prismaClient from "../../prisma";

class ListOrderOpenService{
    async execute(){

        const orders = await prismaClient.order.findMany({
            where:{
                status: 'Em Aberto'
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        return orders
    }
}

export {ListOrderOpenService}