"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reg_schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.reg_schema = joi_1.default.object({
    name: joi_1.default.string()
        .min(2)
        .max(32)
        .required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: joi_1.default.string()
        .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
        .required()
});
