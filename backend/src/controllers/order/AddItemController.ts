import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddtemService";

class AddItemController {
  async handle(request: Request, response: Response) {
    const { order_id, product_id, amount, price, total } = request.body;

    

    const addItem = new AddItemService();

    const orderItem = await addItem.execute({
      order_id,
      product_id,
      amount,
      price, 
      total
    });

    return response.json(orderItem);
  }
}

export { AddItemController };
