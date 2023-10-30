import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { id, name, description, active, stock, estimated_time } =
      request.body;

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute({
      id,
      name,
      description,
      active,
      stock,
      estimated_time,
    });

    return response.json(product);
  }
}
export { UpdateProductController };
