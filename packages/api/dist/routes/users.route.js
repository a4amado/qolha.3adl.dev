"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const catchError_1 = __importDefault(require("../utils/catchError"));
const route = (0, express_1.Router)();
route.get("/:userID", (0, catchError_1.default)(users_controller_1.getUser));
route.delete("/:userID", (0, catchError_1.default)(users_controller_1.deleteUser));
exports.default = route;
