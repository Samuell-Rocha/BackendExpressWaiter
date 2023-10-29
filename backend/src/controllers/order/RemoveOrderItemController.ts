import { Request, Response } from "express";
import { RemoveOrderItemService } from "../../services/order/RemoveOrderItemService";


class RemoveOrderItemController{
    async handle(request: Request, response: Response){

        const item_id = request.query.item_id as string;

        const removeOrdemItem = new RemoveOrderItemService();

        const orderItem = await removeOrdemItem.execute({
            item_id
        })
        return response.json(orderItem)
    }
}

export {RemoveOrderItemController}