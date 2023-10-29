import prismaClient from "../../prisma";


interface CategoryRequest {
    category_id: string;
}

class ListCategoryService{
    async execute({category_id}){

        //array de categorias
        const category = await prismaClient.category.findMany({
         where:{
            id:category_id
         }
        })

        return category
    }
}

export {ListCategoryService}