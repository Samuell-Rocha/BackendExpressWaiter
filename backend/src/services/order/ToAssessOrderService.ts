import prismaClient from "../../prisma";

interface AssessRequest{ 
    order_id: string;
    assessment: number
}

class ToAssessOrderService{
    async execute({order_id, assessment}: AssessRequest){
        
        const assess = await prismaClient.order.update({
            where:{
                id: order_id,
                status: 'Pedido Pronto'
            },
            data:{
                assessment: assessment
            }
        })
        return assess
    }
}

export {ToAssessOrderService}