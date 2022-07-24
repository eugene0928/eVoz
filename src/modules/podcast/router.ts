import { Router } from "express";
import { Add_Podcast, Get_Podcast_By_Category } from "./controller.js";

const router = Router()
router.post("/addpodcast/:admin_id", Add_Podcast)
router.get("/podcast/:category_id", Get_Podcast_By_Category)

export default router