import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class ConcludedOrderService{
    async execute({order_id}: OrderRequest){

        const order =  await prismaClient.order.update({
            where:{
                id: order_id,
                status: 'Em Atendimento'
            },
            data:{
                status: 'Pedido Pronto',
            }
        })

        return order
    }
}

export {ConcludedOrderService}