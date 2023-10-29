import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class SendOrderService{
    async execute({order_id}: OrderRequest ){

        const orderitemm = await prismaClient.orderItem.findFirst({
            select:{
                id: true
            }, where:{
                order_id: order_id
            }
        })
        
        if(orderitemm){
            const order =  await prismaClient.order.update({
                where:{
                    id: order_id,
                    status: 'Em Aberto',
                },
                data:{
                    status: 'Em Atendimento'
                }
            })
            return order
        }
        else{
            throw new Error("Pedido Vazio")
        }        
    }
}

export {SendOrderService}