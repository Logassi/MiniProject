import { Router } from "express";
import { Login, Register } from "../controllers/account.controller";
import {
  LoginValidation,
  RegisterValidation,
} from "../middlewares/validations/account.validation";

const router = Router();

router.post("/register", RegisterValidation, Register);

router.post("/login", LoginValidation, Login);

export default router;
