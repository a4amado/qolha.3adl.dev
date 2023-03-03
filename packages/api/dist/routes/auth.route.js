"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const catchError_1 = __importDefault(require("../utils/catchError"));
const route = (0, express_1.Router)();
route.post("/signUp", (0, catchError_1.default)(auth_controller_1.signUp));
route.post("/logIn", (0, catchError_1.default)(auth_controller_1.signIn));
route.post("/delete");
exports.default = route;
