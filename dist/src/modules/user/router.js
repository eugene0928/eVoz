"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constroller_js_1 = require("./constroller.js");
const router = (0, express_1.Router)();
router.post('/register', constroller_js_1.POST_REG);
exports.default = router;
