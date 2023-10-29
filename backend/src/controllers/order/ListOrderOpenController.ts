import { Request, Response } from "express";
import { ListOrderOpenService } from "../../services/order/ListOrderOpenService";


class ListOrderOpenController{
    async handle(request:Request, response: Response){

        const listOrderOpenService = new ListOrderOpenService();

        const orders = await listOrderOpenService.execute();

        return response.json(orders)

    }
}

export {ListOrderOpenController}