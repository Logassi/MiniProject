import { Router } from "express";
import { Register } from "../controllers/account.controller";

const router = Router();

router.post("/register", Register);

export default router;
