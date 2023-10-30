import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class UpdateOrderService{
    async execute({order_id}: OrderRequest){

        var d = new Date();
        var date = d.toISOString();

        

        const order =  await prismaClient.order.update({
            where:{
                id: order_id,
                OR: [
                    {
                        status: {
                            contains: 'Em Atendimento'
                        },
                    },
                    {
                        status: {
                            contains: 'Pedido Pronto'
                        },
                    },
                ],
            },
            data:{
                status: 'Em Aberto',
                update_at: date
            }
        })

        return order
    }
}

export {UpdateOrderService}