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
exports.Get_Categories = void 0;
const custom_errors_js_1 = require("../../utils/custom.errors.js");
const category_js_1 = require("../../entity/category.js");
const Get_Categories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield category_js_1.Category.find();
        res.status(200).json({ status: 200, message: "All categories", data: allCategories });
    }
    catch (error) {
        next(new custom_errors_js_1.InternalServerError(500, error.message));
    }
});
exports.Get_Categories = Get_Categories;
