import { Router } from "express";
import { CreateEvent } from "../controllers/event.controller";

const router = Router();

router.post("/create", CreateEvent);

export default router;
