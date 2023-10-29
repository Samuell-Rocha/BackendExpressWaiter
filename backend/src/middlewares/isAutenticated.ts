import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface Payload {
  sub: string;
}

export function isAutenticated(permissions?: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    //recebe o token
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
      //valida esse token
      const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

      //recupera o id do token e coloca dentro de uma variavel user_id dentro de uma request
      request.user_id = sub;

      if (permissions) {
        const user = await prismaClient.user.findUnique({
          where: {
            id: { sub }.sub,
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

        const userPermissions =
          user?.userAccess.map((name) => name.Access?.name) ?? [];

        const hasPermission = permissions.some((permission) =>
          userPermissions.includes(permission)
        );

        if (!hasPermission) {
          return response.status(400).end();
        }
      }

      return next();
    } catch (error) {
      return response.status(401).end();
    }
  };
}
