import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

//Sistema de cadastro

interface UserRequest {
    name: string;
    email: string;
    password: string;
    accessName: string
}


class CreateUserService {
    async execute({ name, email, password , accessName}: UserRequest) {

        //Verficar se enviou um email 
        if (!email) {
            throw new Error("Preenchimento obrigatório")
        }

        //verifica se o nivel de acesso existe
        const isAccessName = await prismaClient.access.findUnique({
            where:{
                name: accessName
            }
        })

        if(!isAccessName){
            throw new Error("Este nível de acesso não Existe")
        }

        //verifica se o email ja esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        const passwordHash = await hash(password, 8)

        if (userAlreadyExists) {
            throw new Error("Este usuário ja existe")
        }

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                userAccess:{
                    create:{
                        Access:{
                            connect:{
                                name: accessName
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
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

        return {user}
    }
}

export { CreateUserService }