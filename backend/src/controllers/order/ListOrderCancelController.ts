import { Request, Response } from "express";
import { ListOrderCancelService } from "../../services/order/ListOrderCancelService";



class ListOrderCancelController{
    async handle(request: Request, response: Response){
        
        const listOrderCancelService = new ListOrderCancelService();

        const orders = await listOrderCancelService.execute();

        return response.json(orders)
    }
}

export {ListOrderCancelController}