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
const category_js_1 = require("../entity/category.js");
const categories = ["Stories", "Educational", "Music", "lifestyle & health",
    "Business & Technology", "Arts & Entertainment", "Sports & Reacreation", "Comedy", "News & Politics", "Video games"];
function loadData(AppDataSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield category_js_1.Category.find({});
        if (!data.length) {
            try {
                for (let category of categories) {
                    const entity = new category_js_1.Category();
                    entity.name = category;
                    const getRepository = AppDataSource.getRepository(category_js_1.Category);
                    yield getRepository.save(entity);
                }
                console.log("Category is loaded successfully");
            }
            catch (error) {
                console.log("Category loading failed...");
                console.log(error.message);
            }
        }
    });
}
exports.default = loadData;
