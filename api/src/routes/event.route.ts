import { Router } from "express";
import { CreateEvent } from "../controllers/event.controller";
import { EventValidator } from "../middlewares/validations/event.validation";

const router = Router();

router.post("/create", EventValidator, CreateEvent);

export default router;
