import { Router } from "express";
import { Get_Categories } from "./controller.js";

const router = Router()
router.get("/categories", Get_Categories)

export default router