import {Request, Response } from "express";
import { UpdateOrderService } from "../../services/order/UpdateOrderService";


class UpdateOrderController{
    async handle(request: Request, response: Response){
        
        const {order_id} = request.body

        const updateOrderService = new UpdateOrderService();

        const orders = await updateOrderService.execute({
            order_id
        })

        return response.json(orders)

    }
}

export {UpdateOrderController}