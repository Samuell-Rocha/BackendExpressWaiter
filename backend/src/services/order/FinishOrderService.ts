import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string
}

class FinishOrderService {
    async execute({ order_id }: OrderRequest) {

        var d = new Date();
        var date = d.toISOString();

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
                status: 'Pedido Pronto'
            },
            data: {
                status: 'Pedido Finalizado',
                concluded_at: date
                
            }
        })

        return order
    }
}

export { FinishOrderService }