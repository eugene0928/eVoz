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
exports.Get_Podcast_By_Category = exports.Add_Podcast = void 0;
const user_js_1 = require("../../entity/user.js");
const custom_errors_js_1 = require("../../utils/custom.errors.js");
const joi_js_1 = require("../../utils/joi.js");
const podcast_js_1 = require("../../entity/podcast.js");
const data_source_js_1 = require("../../utils/data-source.js");
const Add_Podcast = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        //check req is sent by admin or not
        let admin = null;
        try {
            admin = yield user_js_1.Users.findOneBy({ id: req.params.admin_id });
        }
        catch (error) {
            next(new custom_errors_js_1.BadRequestError(400, error.message));
            return;
        }
        if (!admin) {
            next(new custom_errors_js_1.NotFoundError(404, "Such admin is not fount"));
            return;
        }
        // admin status
        if (!(admin === null || admin === void 0 ? void 0 : admin.is_admin)) {
            next(new custom_errors_js_1.ValidationError(422, "You don't have permission to add podcast"));
            return;
        }
        // validate body
        const { error, value } = joi_js_1.add_podcast_schema.validate(req.body);
        if (error) {
            next(new custom_errors_js_1.ValidationError(422, error.message));
            return;
        }
        // get data from form-data
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        const image = (_b = req.files) === null || _b === void 0 ? void 0 : _b.image;
        // check if it is audio file
        if (!(file.mimetype.includes('audio/'))) {
            next(new custom_errors_js_1.ValidationError(422, "Only audio files will be accepted"));
            return;
        }
        const time = Date.now();
        //rename file name
        file.name = `${time}${file.name}`;
        //check if it is image file
        if (!(image.mimetype.includes('image/'))) {
            next(new custom_errors_js_1.ValidationError(422, "Only image files will be accepted"));
            return;
        }
        // rename image name
        image.name = `${time}${image.name}`;
        // insert data to db
        let podcast = null;
        try {
            podcast = yield data_source_js_1.AppDataSource.createQueryBuilder()
                .insert()
                .into(podcast_js_1.Podcast)
                .values([{
                    admin: admin,
                    category: value.category_id,
                    name: value.name,
                    speaker: value.speaker,
                    file: file.data.toString("base64"),
                    picture: image.data.toString("base64")
                }])
                .execute();
        }
        catch (error) {
            next(new custom_errors_js_1.ValidationError(422, error.message));
            return;
        }
        // write file to spec folders
        // file.mv(join(process.cwd(), "src", "podcasts", file.name))
        // image.mv(join(process.cwd(), "src", "images", image.name))
        res.status(200).json({ status: 200, message: "Successfully uploaded", data: podcast.identifiers[0].id });
    }
    catch (error) {
        next(new custom_errors_js_1.InternalServerError(500, error.message));
    }
});
exports.Add_Podcast = Add_Podcast;
const Get_Podcast_By_Category = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get data from db
        let podcasts = yield data_source_js_1.AppDataSource.getRepository(podcast_js_1.Podcast)
            .createQueryBuilder("podcast")
            .where("podcast.categoryId = :id", { id: req.params.category_id })
            .getMany();
        if (podcasts) {
            res.status(200).json({ status: 200, message: "Available podcasts", data: podcasts });
        }
        else
            res.status(404).json({ status: 404, message: "Not available podcasts to this category", data: null });
    }
    catch (error) {
        next(new custom_errors_js_1.InternalServerError(500, error.message));
    }
});
exports.Get_Podcast_By_Category = Get_Podcast_By_Category;
