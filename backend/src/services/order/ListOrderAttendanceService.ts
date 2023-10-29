import prismaClient from "../../prisma";


class ListOrderAttendanceService{
    async execute(){

        const orders = await prismaClient.order.findMany({
            where:{
                status: 'Em Atendimento'
            },
            orderBy:{
                created_at: 'desc'
            }
        })
        return orders
    }
}

export {ListOrderAttendanceService}