import { request, Request, Response } from "express";
import { ConcludedOrderService } from "../../services/order/ConcludedOrderService";


class ConcludedOrderController{
    async handle(request: Request, response: Response){
        
        const {order_id} = request.body

        const concludedOrderService = new ConcludedOrderService();

        const orders = await concludedOrderService.execute({
            order_id
        })

        return response.json(orders)
    }
}

export {ConcludedOrderController}