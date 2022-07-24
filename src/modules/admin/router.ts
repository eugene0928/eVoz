import { Router } from "express";
import { Change_Email, Change_Passw, Update_Passw } from "./credentials.controller.js";

const router = Router()
router.get("/change/passw/:admin_id", Change_Passw)
router.put("/change/passw/:admin_id", Update_Passw)

export default router