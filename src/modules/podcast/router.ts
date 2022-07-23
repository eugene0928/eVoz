import { Router } from "express";
import { Add_Podcast } from "./controller.js";

const router = Router()
router.post("/addpodcast/:admin_id", Add_Podcast)

export default router