import { Request, Response } from "express";
import { ListOrderPreparedService } from "../../services/order/ListOrderPreparedService";


class ListOrderPreparedController{
    async handle(request:Request, response: Response){

        const listOrderPreparedService = new ListOrderPreparedService();

        const orders = await listOrderPreparedService.execute();

        return response.json(orders)

    }
}

export {ListOrderPreparedController}