import { Request, Response } from "express";
import { CreateTableService } from "../../services/table/CreateTableService";

class CreateTableController {
    async handle(request: Request, response: Response) {
        
        const { table_id, nameqrcode } = request.body;
        

        const createTableService = new CreateTableService();

        if (!request.file) {
            throw new Error("Erro ao carregar o arquivo")
        } else {

            const { originalname, filename: qrcode } = request.file

            const tables = await createTableService.execute({
                table_id,
                qrcode,
                nameqrcode
            });

            return response.json(tables)
        }


    }
}

export { CreateTableController }