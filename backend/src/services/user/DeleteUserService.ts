import { User } from "@prisma/client";
import prismaClient from "../../prisma";

interface UserProps {
  user_id: string;
}

class DeleteUserService {
  async execute({ user_id }: UserProps) {
    const user = await prismaClient.user.delete({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}

export { DeleteUserService };
