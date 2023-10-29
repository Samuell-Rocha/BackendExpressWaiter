import { json } from "express";
import prisma from "../../prisma";
import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class CalcTotalOrderService {
  async execute({ order_id }: OrderRequest) {
    //const totals = await prisma.$queryRawUnsafe`SELECT amount FROM "OrderItens" WHERE id = ${order_id} `
    const calc =
      await prisma.$queryRaw<string>`SELECT SUM(total) FROM "OrderItens" where order_id = ${order_id}`;

    const convertString = JSON.stringify(calc, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    });

    const convertObject = JSON.parse(convertString);

    var value;

    convertObject.forEach((val) => {
      value = val.sum;
    });

    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        total: value,
      },
    });

    return order;
  }
}

export { CalcTotalOrderService };
