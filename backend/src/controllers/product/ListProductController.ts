import {Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";



class ListProductController {
    async handle(request: Request, response: Response) {

        const category_id = request.query.category_id as string;
        const product_id = request.query.product_id as string;
        const stock = request.query.stock as string;
      

        const listProductService = new ListProductService();

        const products = await listProductService.execute({
            product_id: product_id,
            category_id: category_id,
            stock: stock,
        })

        return response.json(products);
    }
}

export { ListProductController }