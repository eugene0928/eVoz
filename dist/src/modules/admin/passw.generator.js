"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass_generator = void 0;
const generate_password_1 = __importDefault(require("generate-password"));
const pass_generator = () => {
    // generate passw
    const passw = generate_password_1.default.generate({
        length: 7,
        numbers: true
    });
    // store pass to check before updating the admin passw
    process.env.GEN_PASS = passw;
    return passw;
};
exports.pass_generator = pass_generator;
