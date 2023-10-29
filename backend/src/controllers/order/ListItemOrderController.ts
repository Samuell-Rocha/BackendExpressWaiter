import {Request, Response } from "express";
import { ListItemOrderService } from "../../services/order/ListItemOrderService";



class ListItemOrderController {
    async handle(request: Request, response: Response) {

        const order_id = request.query.order_id as string;


        const listItemOrderService = new ListItemOrderService();

        const itens = await listItemOrderService.execute({
           order_id: order_id
        })

        return response.json(itens);
    }
}

export { ListItemOrderController }