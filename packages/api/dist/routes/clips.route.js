"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clips_controller_1 = require("../controllers/clips.controller");
const catchError_1 = __importDefault(require("../utils/catchError"));
const route = (0, express_1.Router)();
route.get("/:clipID", (0, catchError_1.default)(clips_controller_1.streamClip));
//@ts-ignore
route.get("/toBeReviewed", (0, catchError_1.default)(clips_controller_1.getClipThatNeedsToBeReviewed));
route.post("/:clipID/accept", (0, catchError_1.default)(clips_controller_1.acceptClip));
route.post("/:clipID/reject", (0, catchError_1.default)(clips_controller_1.rejectClip));
route.post("/:clipID/rate", clips_controller_1.appendRate);
exports.default = route;
