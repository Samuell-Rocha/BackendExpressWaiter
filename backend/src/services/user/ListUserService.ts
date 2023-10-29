import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string;
}

class ListUserService{
    async execute({user_id}){
        
        const user = await prismaClient.user.findMany({
            where:{
                id: user_id,
            },
            select:{
                id: true,
                email: true,
                name: true,
                userAccess:{
                  select:{
                    Access:{
                        select:{
                            name:true
                        }
                    }
                   
                  }
                  
                }
              },
              
        })

        return user;
    }
}

export {ListUserService}