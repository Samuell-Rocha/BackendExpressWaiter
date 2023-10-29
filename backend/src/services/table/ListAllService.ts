import prismaClient from "../../prisma";

class ListAllTabletService {
  async execute() {

   

    const findByTable = await prismaClient.table.findMany();

    return findByTable;
  }
}

export { ListAllTabletService };
