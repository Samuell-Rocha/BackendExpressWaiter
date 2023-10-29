import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";


class ListCategoryController{
    async handle(request: Request, response: Response){

        const category_id = request.query.category_id as string;
        
        const listCategoryService = new ListCategoryService();

        const category = await listCategoryService.execute({
            category_id: category_id
        });

        return response.json(category)
    }
}

export {ListCategoryController}