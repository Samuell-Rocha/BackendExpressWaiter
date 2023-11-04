import prismaClient from "../../prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
  price: number;
  total: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount, price, total }: ItemRequest) {



    const verifySatus = await prismaClient.product.findFirst({
      where: {
        id: product_id,
        active:false
      },
    });

    if (verifySatus) {
      throw new Error("Este produto esta desativado");
    }

    const order = await prismaClient.orderItem.create({
      data: {
        order_id: order_id,
        product_id: product_id,
        amount: amount,
        price: price,
        total: total
      },
    });

    return order;
  }
}

export { AddItemService };
