import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {

        if (name === '') {
            throw new Error("Nome inválido")
        }

        const productAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        if (productAlreadyExists) {
            throw new Error("Esta Categoria ja esta cadastrado")
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true
            }
        })

        return category;
    }
}

export { CreateCategoryService }