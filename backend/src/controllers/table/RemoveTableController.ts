import { Request, Response } from "express";
import { RemoveTableService } from "../../services/table/RemoveTableService";

class RemoveTableController{
    async handle(request: Request, response: Response){

        const table_id = request.query.table_id as string

        const removeTableService = new RemoveTableService();

        const tables =  await removeTableService.execute({
            table_id: table_id
        })

        return response.json(tables)
    }
}

export {RemoveTableController}