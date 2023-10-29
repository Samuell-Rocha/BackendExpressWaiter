import prismaClient from "../../prisma";

interface ProductRequest{
    order_id: string
}

class UpdateProductService{
        async execute({order_id}: ProductRequest){
    
            var d = new Date();
            var date = d.toISOString();
    
            const order =  await prismaClient.order.update({
                where:{
                    id: order_id,
                },
                data:{
                    
                }
            })
    
            return order
        }
    }
    
    export {UpdateProductService}