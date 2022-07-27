"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Podcast = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_js_1 = require("./user.js");
const category_js_1 = require("./category.js");
let Podcast = class Podcast extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Podcast.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_js_1.Users, (user) => user.id, { nullable: false }),
    __metadata("design:type", user_js_1.Users)
], Podcast.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_js_1.Category, (category) => category.podcast, { nullable: false }),
    __metadata("design:type", category_js_1.Category)
], Podcast.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(2, 256),
    __metadata("design:type", String)
], Podcast.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Length)(2, 128),
    __metadata("design:type", String)
], Podcast.prototype, "speaker", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bytea" }),
    __metadata("design:type", typeorm_1.Long)
], Podcast.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bytea" }),
    __metadata("design:type", typeorm_1.Long)
], Podcast.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Podcast.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Podcast.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Podcast.prototype, "deleted_at", void 0);
Podcast = __decorate([
    (0, typeorm_1.Entity)({ name: "podcast" })
], Podcast);
exports.Podcast = Podcast;
