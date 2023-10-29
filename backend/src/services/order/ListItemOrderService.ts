import prismaClient from "../../prisma";

interface ProductRequest {
  order_id: string
}
class ListItemOrderService{
  async execute({ order_id}: ProductRequest) {


    const findByItens = await prismaClient.orderItem.findMany({
      where: {
        order_id: order_id
      },include:{
        product:{
          select:{
            name:true
          }
          
        }
      }
    });

    return findByItens;
  }
}

export { ListItemOrderService };