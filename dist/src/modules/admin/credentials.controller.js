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
exports.Update_Passw = exports.Change_Email = exports.Change_Passw = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const custom_errors_js_1 = require("../../utils/custom.errors.js");
const user_js_1 = require("../../entity/user.js");
const send_email_js_1 = require("./email/send.email.js");
const passw_generator_js_1 = require("./passw.generator.js");
const Change_Passw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield user_js_1.Users.findOne({
            select: {
                id: true,
                name: true,
                email: true,
                is_admin: true
            },
            where: { id: req.params.admin_id }
        });
        if (!admin) {
            next(new custom_errors_js_1.NotFoundError(404, "Such admin is not fount"));
            return;
        }
        if (!(admin === null || admin === void 0 ? void 0 : admin.is_admin)) {
            next(new custom_errors_js_1.BadRequestError(400, "You do not have permission to change credentials"));
            return;
        }
        const new_passw = (0, passw_generator_js_1.pass_generator)();
        yield (0, send_email_js_1.sendEmail)(admin === null || admin === void 0 ? void 0 : admin.email, new_passw);
        res.status(200).json({ status: 200, message: "Please, check your email", data: new_passw });
    }
    catch (error) {
        next(new custom_errors_js_1.InternalServerError(500, error.message));
    }
});
exports.Change_Passw = Change_Passw;
const Change_Email = () => {
};
exports.Change_Email = Change_Email;
const Update_Passw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if admin get generated password
        if (!process.env.GEN_PASS) {
            next(new custom_errors_js_1.BadRequestError(400, "You should get password first"));
            return;
        }
        // validate generated password
        if (process.env.GEN_PASS != req.body.passw) {
            next(new custom_errors_js_1.ValidationError(422, "Password does not match. Please use password which is sent to your email"));
            return;
        }
        // validate admin passwords
        if (!(req.body.new_passw.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))) {
            next(new custom_errors_js_1.BadRequestError(400, "Invalid password. Password should have at least one uppercase, one digit and length should be at least 8"));
            return;
        }
        if (req.body.new_passw != req.body.confirm_passw) {
            next(new custom_errors_js_1.ValidationError(422, "Passwords do not match"));
            return;
        }
        // get admin from db
        const admin = yield user_js_1.Users.findOne({
            select: {
                id: true,
                name: true,
                email: true,
                is_admin: true
            },
            where: { id: req.params.admin_id }
        });
        // validation
        if (!admin) {
            next(new custom_errors_js_1.NotFoundError(404, "Such admin is not fount"));
            return;
        }
        if (!(admin === null || admin === void 0 ? void 0 : admin.is_admin)) {
            next(new custom_errors_js_1.BadRequestError(400, "You do not have permission to change credentials"));
            return;
        }
        // hash the password
        req.body.new_passw = yield bcrypt_1.default.hash(req.body.new_passw, 5);
        // update admin password
        admin.password = req.body.new_passw;
        yield admin.save();
        // clean the environment password
        process.env.GEN_PASS = "";
        res.status(200).json({ status: 200, message: "Your password is updated!", data: admin });
    }
    catch (error) {
        next(new custom_errors_js_1.InternalServerError(500, error.message));
    }
});
exports.Update_Passw = Update_Passw;
