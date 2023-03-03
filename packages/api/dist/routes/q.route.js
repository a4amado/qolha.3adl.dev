"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const q_controller_1 = require("../controllers/q.controller");
const catchError_1 = __importDefault(require("../utils/catchError"));
const route = (0, express_1.Router)();
route.get("/:q", (0, catchError_1.default)(q_controller_1.queryHits));
exports.default = route;
