import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";


class ListOrderController{
    async handle(request: Request, response: Response){

        const order_id = request.query.order_id as string;
        
        const listService = new ListOrderService();

        const orders = await listService.execute({
            order_id: order_id
        });

        return response.json(orders)
    }
}

export {ListOrderController}