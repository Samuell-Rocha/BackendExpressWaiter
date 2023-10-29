import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma";

interface Payload {
  sb: string;
}

export function isPermission(permissions?: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {


      //valida esse token
      //const { sb } = verify(token, process.env.JWT_SECRET) as Payload;

   // request.order_id = sb
   
/*
    try {
      

      if (permissions) {
        const user = await prismaClient.order.findUnique({
          where: {
            id: 
          }
        });

      

        const userPermissions = user?.userAccess.map((name) => name.Access?.name) ?? [];

       

        const hasPermission = permissions.some((permission) =>
          userPermissions.includes(permission)
        );

        if (!hasPermission) {
          return response.status(403).json({ message: "Permissão Negada" });
        }
      }

      return next();
    } catch (error) {
      return response.status(401).end();
    }
    */
  };
}
