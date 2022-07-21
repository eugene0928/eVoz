"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const handler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error.status == 500) {
        const data = `${new Date().toISOString()}___${req.url}___${req.method}___${error.message}`;
        (0, promises_1.writeFile)((0, path_1.join)(process.cwd(), "logger.txt"), data);
        res.status(500).json({ status: 500, name: "InternalServerError", message: "Internal Server Error" });
        return;
    }
    res.status(error.status).json({ status: error.status, name: error.name, message: error.message });
});
exports.handler = handler;
