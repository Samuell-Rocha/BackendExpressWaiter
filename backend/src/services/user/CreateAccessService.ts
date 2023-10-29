import prismaClient from "../../prisma";

interface PermissionsRequest{
    name: string;
}

class CreateAccessService{
    async execute({name}: PermissionsRequest){


        const permission = await prismaClient.access.create({
            data:{
                name: name
            }
        })

        return {permission}

    }
}

export {CreateAccessService}