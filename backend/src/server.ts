import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import cors from 'cors';
import path from 'path'

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

const port = process.env.PORT ?? 4000



//localhost:2627/files/urldaimagem.png - acessa a imagem
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((error: Error, request: Request, response: Response, nextfunction: NextFunction) => {
    if (error instanceof Error) {

        //se for uma instancia do tipo error
        return response.status(400).json({
            error: error.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})

app.listen(port, () => {console.log(`Servidor Online no http://localhost:${port}/`);
})
