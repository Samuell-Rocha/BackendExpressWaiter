import { Request, Response } from "express";
import { ListAccessService } from "../../services/user/ListAccessService";



class ListAccessController{
    async handle(request: Request, response: Response){

        const access_id = request.query.access_id as string;
        
        const listAccessService = new ListAccessService();

        const access = await listAccessService.execute({
            access_id: access_id
        });

        return response.json(access)
    }
}

export {ListAccessController}