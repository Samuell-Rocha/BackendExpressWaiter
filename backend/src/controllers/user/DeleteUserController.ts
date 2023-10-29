import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";


class DeleteUserController{
    async handle(request: Request, response: Response){

        const user_id = request.query.user_id as string;

        const deleteUserService = new DeleteUserService();

        const user = await deleteUserService.execute({
            user_id: user_id
        })

        return response.json(user)

    }
}

export {DeleteUserController}