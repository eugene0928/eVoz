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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const user_js_1 = require("../../entity/user.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const custom_errors_js_1 = require("../../utils/custom.errors.js");
const Register = (req, res, next) => {
};
exports.Register = Register;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get user data by email and check passw with hashed passw
        const user = yield user_js_1.Users.findOne({ where: { email: req.body.email } });
        const is_true_hashedPassw = bcrypt_1.default.compareSync(req.body.password, `${user === null || user === void 0 ? void 0 : user.password}`);
        // throw error if user can not login properly
        if (!user || !is_true_hashedPassw) {
            next(new custom_errors_js_1.BadRequestError(400, "Invalid email or password"));
            return;
        }
        res.status(200).json({ status: 200, message: "Successfully logged in", data: user === null || user === void 0 ? void 0 : user.id });
    }
    catch (error) {
        next(new custom_errors_js_1.InternalServerError(500, error.message));
    }
});
exports.Login = Login;
