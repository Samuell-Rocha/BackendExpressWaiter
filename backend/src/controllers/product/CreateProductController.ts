import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";


class CreateProductController {
    async handle(request: Request, response: Response) {
        
        const { name, price, description, estimated_time, category_id, active} = request.body;

        const createProductService = new CreateProductService();

        if (!request.file) {
            throw new Error("Erro ao carregar o arquivo")
        } else {

            const { originalname, filename: banner } = request.file

            const product = await createProductService.execute({
                name,
                price,
                description,
                estimated_time,
                banner,
                category_id,
                active
            });

            return response.json(product)
        }


    }
}

export { CreateProductController }