import { Request, Response, NextFunction } from "express";
import { User } from "../custom";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../utils/envConfig";

async function VerifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new Error("Unauthorized");

    const user = verify(token, SECRET_KEY as string);

    // console.log(user);

    if (!user) throw new Error("Unauthorized");

    req.user = user as User;

    next();
  } catch (err) {
    next(err);
  }
}

async function AdminGuard(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.user?.roleId);
    console.log(req.user?.name);

    if (req.user?.roleId !== 2) {
      console.log("Not an Event Organizer");
      throw new Error("Not an Event Organizer");
    }

    console.log("an Admin");

    next();
  } catch (err) {
    next(err);
  }
}

export { VerifyToken, AdminGuard };
