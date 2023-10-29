import prismaClient from "../../prisma";

interface OrderRequeste{
    order_id: string;
}


class ListOrderService{
    async execute({ order_id}: OrderRequeste){

        const orders = await prismaClient.order.findMany({
            where:{
                id: order_id
            },
            orderBy:{
                created_at: 'desc'
            }
        })

        return orders
    }
}

export {ListOrderService}