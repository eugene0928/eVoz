"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_js_1 = require("./controller.js");
const router = (0, express_1.Router)();
router.post("/addpodcast/:admin_id", controller_js_1.Add_Podcast);
router.get("/podcast/:category_id", controller_js_1.Get_Podcast_By_Category);
exports.default = router;
