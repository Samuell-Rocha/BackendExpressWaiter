import { Request, response, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';


class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password, accessName } = request.body

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password,
            accessName
        });

        return response.json(user)

    }
}
export { CreateUserController }