import prismaClient from "../../prisma";


class ListProductReportService {
  async execute() {

    const findByCategory = await prismaClient.product.findMany();

    return findByCategory;
  }
}

export { ListProductReportService };