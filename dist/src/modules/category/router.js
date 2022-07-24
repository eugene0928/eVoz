"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_js_1 = require("./controller.js");
const router = (0, express_1.Router)();
router.get("/categories", controller_js_1.Get_Categories);
exports.default = router;
