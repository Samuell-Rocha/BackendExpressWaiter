import {Request, Response } from "express";
import { ListTabletService } from "../../services/table/ListTabletService";


class ListTableController{
    async handle(request: Request, response: Response){

        const table_id = request.query.table_id as string
        
        const listTableService = new ListTabletService();

        const tabled = await listTableService.execute({
            table_id: table_id
        });

        return response.json(tabled)
    }
}

export {ListTableController}