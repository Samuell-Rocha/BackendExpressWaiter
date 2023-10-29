import { Request, Response } from "express";
import { CalcTotalItemOrderService } from "../../services/order/CalcTotalItemOrderService";


class CalcTotalITemController{
    async handle(request: Request, response: Response){

        const {order_id} = request.body;
        
        const calcOrder = new CalcTotalItemOrderService();

        const orderItem = await calcOrder.execute({
            order_id
        });

        return response.json(orderItem)
    }
}

export {CalcTotalITemController}

