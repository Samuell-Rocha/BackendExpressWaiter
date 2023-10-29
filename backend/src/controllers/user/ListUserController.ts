
import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUserService";

class ListUserController {
    async handle(request: Request, response: Response) {

        const user_id = request.query.user_id as string;
        
        const listUserService = new ListUserService();

        const user = await listUserService.execute({
            user_id: user_id
        });

        return response.json(user)
    }
}

export { ListUserController }