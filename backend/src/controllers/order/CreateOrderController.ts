import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";


class CreateOrderController{
    async handle(request: Request, response: Response){

        const {table_id, name} = request.body


        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({
            table_id: table_id,
            name: name,
        })

        return response.json(order)

    }
}

export {CreateOrderController}