"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentials_controller_js_1 = require("./credentials.controller.js");
const router = (0, express_1.Router)();
router.get("/change/passw/:admin_id", credentials_controller_js_1.Change_Passw);
router.put("/change/passw/:admin_id", credentials_controller_js_1.Update_Passw);
exports.default = router;
