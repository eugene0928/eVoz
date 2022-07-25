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
const express_1 = __importDefault(require("express"));
require("./conf.js");
require("./bot/bot.js");
const data_source_js_1 = require("./utils/data-source.js");
const podcast_js_1 = __importDefault(require("./data/podcast.js"));
const index_js_1 = __importDefault(require("./modules/index.js"));
const errorHandling_js_1 = require("./utils/errorHandling.js");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = require("path");
const app = (0, express_1.default)();
const PORT = 4000;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield data_source_js_1.AppDataSource.initialize();
            console.log("Db is initialized!");
            yield (0, podcast_js_1.default)(data_source_js_1.AppDataSource);
            // static folders
            app.use(express_1.default.static((0, path_1.join)(process.cwd(), "src", "images")));
            app.use(express_1.default.static((0, path_1.join)(process.cwd(), "src", "podcasts")));
            // middlewares
            app.use(express_1.default.json());
            app.use((0, express_fileupload_1.default)());
            // routes
            app.use(index_js_1.default.UserRouter);
            app.use(index_js_1.default.CategoryRouter);
            app.use(index_js_1.default.PodcastRouter);
            app.use(index_js_1.default.AdminRouter);
            //error handler
            app.use(errorHandling_js_1.handler);
        }
        catch (error) {
            console.log(error.message);
        }
        app.listen(PORT, () => console.log('=> ' + PORT));
    });
})();
