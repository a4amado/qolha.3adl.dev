"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const words_controller_1 = require("../controllers/words.controller");
const upload_1 = __importDefault(require("../middleware/upload"));
const catchError_1 = __importDefault(require("../utils/catchError"));
const route = (0, express_1.Router)();
route.post("/", (0, catchError_1.default)(words_controller_1.appendWord));
route.get("/:wordID", (0, catchError_1.default)(words_controller_1.QueryWord));
route.get("/getWordWithTheLeastClips", (0, catchError_1.default)(words_controller_1.getWordWithTheLeastClips));
route.get("/:wordID/clips", (0, catchError_1.default)(words_controller_1.listClipsForWord));
route.post("/:wordID/clip", (0, catchError_1.default)(upload_1.default.single("clip")), (0, catchError_1.default)(words_controller_1.appendClipToWord));
exports.default = route;
