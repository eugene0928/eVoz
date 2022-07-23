import { Router } from "express";
import { Register, Login, Register_Admin } from "./controller.js";

const router = Router()
router.post("/register", Register)
router.post("/register/:admin_id", Register_Admin)
router.post("/login", Login)

export default router