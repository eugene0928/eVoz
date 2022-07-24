"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_js_1 = __importDefault(require("./user/router.js"));
const router_js_2 = __importDefault(require("./category/router.js"));
const router_js_3 = __importDefault(require("./podcast/router.js"));
const router_js_4 = __importDefault(require("./admin/router.js"));
exports.default = {
    UserRouter: router_js_1.default,
    CategoryRouter: router_js_2.default,
    PodcastRouter: router_js_3.default,
    AdminRouter: router_js_4.default
};
