import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { response } from "express";

//Sistema de Login

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    try {
      //Verificar se o email existe.
      const user = await prismaClient.user.findUnique({
        where: {
          email: email,
        },
        include: {
          userAccess: {
            select: {
              Access: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        throw new Error("Usuário ou senha incorreta");
      }

      //verifica se a senha que ele colocou esta correta
      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Usuário ou senha incorreta");
      }

      //gera um token jwt e devolve dados aos usuarios (email, senha)
      const token = sign(
        {
          name: user.name,
          email: user.email,
          roles: user.userAccess.map((role) => role.Access?.name),
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: "30d",
        }
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      };
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}

export { AuthUserService };
