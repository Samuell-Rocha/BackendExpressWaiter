import prismaClient from "../../prisma";

interface ProductRequest {
  id: string;
  name: string;
  description: string;
  estimated_time: string;
  active: string;
  stock: string;
}

class UpdateProductService {
  async execute({
    id,
    name,
    description,
    active,
    stock,
    estimated_time
  }: ProductRequest) {


    var d = new Date();
    var date = d.toISOString();

    //var convertPrice = Number(price);
    var convertActive = Boolean(active == 'true');
    var convertStock = Boolean(stock == 'true');
    

    const product = await prismaClient.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        active: convertActive,
        stock: convertStock,
        estimated_time: estimated_time
      },
    });

    return product;
  }
}

export { UpdateProductService };
