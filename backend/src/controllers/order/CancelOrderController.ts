import { Request, Response } from "express";
import { CancelOrderService } from "../../services/order/CancelOrderService";


class CancelOrderController{
    async handle(request: Request, response: Response){

        const {order_id} = request.body

        const cancelOrderService = new CancelOrderService();

        const order = await cancelOrderService.execute({
            order_id
        })

        return response.json(order)
    }
}

export {CancelOrderController}