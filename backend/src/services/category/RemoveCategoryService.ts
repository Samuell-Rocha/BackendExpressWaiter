import prismaClient from "../../prisma";

interface CategoryRequest {
  category_id: string;
}

class RemoveCategoryService {
  async execute({ category_id }: CategoryRequest) {
    const product = await prismaClient.product.findFirst({
      where: {
        category_id: category_id,
      },
    });

    if (product) {
      throw new Error("Tem produto dependendo desta categoria");
    }

    const category = await prismaClient.category.delete({
      where: {
        id: category_id,
      },
    });

    return category;
  }
}

export { RemoveCategoryService };
