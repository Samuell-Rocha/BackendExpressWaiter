import prismaClient from "../../prisma";

interface OrderRequest{
    table_id: number;
    name:string;
}

class CreateOrderService{
    async execute({table_id, name}: OrderRequest){


       
 const OrderAlreadyExists = await prismaClient.order.findFirst({
            where: {
                table_id: table_id,
                OR:[{
                    status:{
                        contains: 'Em Aberto'
                    },
                },
                {
                    status:{
                        contains: 'Em Atendimento'
                    },
                },
                {
                    status:{
                        contains: 'Pedido Pronto'
                    },
                },
                    
                ]
            }
        })

        if (OrderAlreadyExists) {
            throw new Error("Esta Mesa ja esta em Uso")
        }

       
        const order = await prismaClient.order.create({
           
            data:{
                table_id: table_id,
                name: name,
                status: 'Em Aberto'
            }
            
        })

        return order;
    }
}

export {CreateOrderService}