import prismaClient from "../../prisma";

interface TableRequest {
  table_id: string;
}

class ListTabletService {
  async execute({ table_id }: TableRequest) {

    const number = parseInt(table_id)

    const findByTable = await prismaClient.table.findMany({
      where: {
        id: number,
      }
    });

    return findByTable;
  }
}

export { ListTabletService };
