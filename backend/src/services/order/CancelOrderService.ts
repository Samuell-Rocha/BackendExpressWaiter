import prismaClient from "../../prisma";

interface CancelRequest {
    order_id: string;
}

class CancelOrderService {
    async execute({ order_id }: CancelRequest) {

        var d = new Date();
        var date = d.toISOString();

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
                OR: [
                    {
                        status: {
                            contains: 'Em Aberto'
                        },
                    },
                    {
                        status: {
                            contains: 'Em Atendimento'
                        },
                    },
                ],
            },
            data: {
                status: 'Cancelado',
                concluded_at: date,
                
            }
        })

        return order
    }
}

export { CancelOrderService }

function formatISO(arg0: Date) {
    throw new Error("Function not implemented.");
}
