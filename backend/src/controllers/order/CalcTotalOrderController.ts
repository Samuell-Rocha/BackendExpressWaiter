import { Request, Response } from "express";
import { CalcTotalOrderService } from "../../services/order/CalcTotalOrderService";


class CalcTotalOrderController{
    async handle(request: Request, response: Response){

        const {order_id} = request.body;
        
        const calcOrder = new CalcTotalOrderService();

        const order = await calcOrder.execute({
            order_id
        });

        return response.json(order)
    }
}

export {CalcTotalOrderController}

