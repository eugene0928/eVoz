"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_js_1 = require("../entity/user.js");
const category_js_1 = require("../entity/category.js");
const podcast_js_1 = require("../entity/podcast.js");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [user_js_1.Users, category_js_1.Category, podcast_js_1.Podcast],
    subscribers: [],
    migrations: [],
});
