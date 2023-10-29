import { Request, response, Response } from 'express';
import { CreateAccessService } from '../../services/user/CreateAccessService';


class CreateAccessController {
    async handle(request: Request, response: Response) {
        const { name } = request.body

        const createAccessService = new CreateAccessService();

        const acesss = await createAccessService.execute({
            name
        });

        return response.json(acesss)

    }
}
export { CreateAccessController }