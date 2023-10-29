import { HrTime } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: number;
    description: string;
    estimated_time: string;
    banner: string;
    category_id: string
    active: boolean
}

class CreateProductService {
    async execute({ name, price, description, estimated_time, banner, active, category_id }: ProductRequest) {

        if (name === '') {
            throw new Error("Nome inválido")
        }

        const productAlreadyExists = await prismaClient.product.findFirst({
            where: {
                name: name
            }
        })

        if (productAlreadyExists) {
            throw new Error("Este produto ja esta cadastrado")
        }

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                estimated_time: estimated_time,
                banner: banner,
                category_id: category_id
            }
        })

        return product

    }
}

export { CreateProductService }