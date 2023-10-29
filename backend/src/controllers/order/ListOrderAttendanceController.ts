import { Request, Response } from "express";
import { ListOrderAttendanceService } from "../../services/order/ListOrderAttendanceService";



class ListOrderAttendanceController{
    async handle(request: Request, response: Response){
        
        const listOrderAttendanceService = new ListOrderAttendanceService();

        const orders = await listOrderAttendanceService.execute();

        return response.json(orders)
    }
}

export {ListOrderAttendanceController}