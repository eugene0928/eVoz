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
exports.sendEmail = void 0;
const conf_email_js_1 = require("./conf.email.js");
const sendEmail = (email, passw) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = yield (0, conf_email_js_1.conf)();
        yield transporter.sendMail({
            to: email,
            subject: "Noreply",
            html: `This is your code. Use it to change your credentials: <b>${passw}</b>`
        });
    }
    catch (error) {
        throw error;
    }
});
exports.sendEmail = sendEmail;
