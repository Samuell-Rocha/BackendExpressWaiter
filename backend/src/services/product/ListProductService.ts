import prismaClient from "../../prisma";

interface ProductRequest {
  category_id: string;
  product_id: string;
  stock: string;
}

class ListProductService {
  async execute({ category_id, product_id, stock }) {
    var convertStock = Boolean(stock == 'true');

    const findByCategory = await prismaClient.product.findMany({
      where: {
        id: product_id,
        category_id: category_id,
        stock: convertStock,
      },
    });

    return findByCategory;
  }
}

export { ListProductService };
