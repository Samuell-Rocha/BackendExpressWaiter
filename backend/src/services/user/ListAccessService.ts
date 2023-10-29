import prismaClient from "../../prisma";


interface AccessRequest {
    access_id: string;
}

class ListAccessService{
    async execute({access_id}){


        const permissions = await prismaClient.access.findMany({
         where:{
            id:access_id
         },
         
        })

        return permissions
    }
}

export {ListAccessService}