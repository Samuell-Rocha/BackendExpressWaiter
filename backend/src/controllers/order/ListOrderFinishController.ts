import { Request, Response } from "express";
import { ListOrderFinishService } from "../../services/order/ListOrderFinishService";


class ListOrderFinishController{
    async handle(request:Request, response: Response){

        const listOrderFinishService = new ListOrderFinishService();

        const orders = await listOrderFinishService.execute();

        return response.json(orders)

    }
}

export {ListOrderFinishController}