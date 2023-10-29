import { Request, Response } from "express";
import { RemoveCategoryService } from "../../services/category/RemoveCategoryService";

class RemoveCategoryController{
    async handle(request: Request, response: Response){

        const category_id = request.query.category_id as string;

        const removeCategoryController = new RemoveCategoryService();

        const category = await removeCategoryController.execute({
                category_id: category_id
        })

        return response.json(category)

    }
}

export {RemoveCategoryController}