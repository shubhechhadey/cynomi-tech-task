import { Router, Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/User";

const router = Router();

interface UserResponse {
  userName: string;
  gender: string;
  entryCount: number;
}

router.get("/users", async (req: Request, res: Response<UserResponse[]>) => {
    const users = await User.findMany({
      include: {
        Sleep: true,
      },
    });

    const response: UserResponse[] = users.map(user => ({
      userName: user.userName,
      gender: user.gender,
      entryCount: user.Sleep.length,
    }));

    res.status(200).send(response);
});

export default router;