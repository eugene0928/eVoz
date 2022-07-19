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
exports.POST_REG = void 0;
const class_validator_1 = require("class-validator");
const data_source_js_1 = require("../../utils/data-source.js");
const user_js_1 = require("../../entity/user.js");
const POST_REG = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_js_1.Users();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        const errors = yield (0, class_validator_1.validate)(user);
        if (errors.length) {
            next("Validation error");
            return;
        }
        console.log(user);
        yield data_source_js_1.AppDataSource.manager.save(user);
        res.status(200).json({ status: 200, message: "registered successfully", data: user });
    }
    catch (error) {
        next(error.message);
    }
});
exports.POST_REG = POST_REG;
exports.default = {
    POST_REG: exports.POST_REG
};
