import { Router } from "express";
import { CreateEvent } from "../controllers/event.controller";
import { EventValidator } from "../middlewares/validations/event.validation";
import { AdminGuard, VerifyToken } from "../middlewares/event.middleware";

const router = Router();

router.post("/create", VerifyToken, AdminGuard, EventValidator, CreateEvent);

export default router;
