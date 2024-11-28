import { Request, Response, NextFunction } from "express";

async function CreateEvent(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export { CreateEvent };
