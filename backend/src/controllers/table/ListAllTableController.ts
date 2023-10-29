import {Request, Response } from "express";
import { ListAllTabletService } from "../../services/table/ListAllService";


class ListAllTableController{
    async handle(request: Request, response: Response){
        
        const listAllTableService = new ListAllTabletService();

        const table = await listAllTableService.execute();

        return response.json(table)
    }
}

export {ListAllTableController}