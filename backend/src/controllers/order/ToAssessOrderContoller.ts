import { Request, Response } from "express";
import { ToAssessOrderService } from "../../services/order/ToAssessOrderService";


class ToAssesOrderController{
    async handle(request: Request, response: Response){

        const {order_id, assessment} = request.body;
        
        const toAssessOrderService = new ToAssessOrderService();

        const assess = await toAssessOrderService.execute({
            order_id,
            assessment: assessment
        });

        return response.json(assess)
    }
}

export {ToAssesOrderController}