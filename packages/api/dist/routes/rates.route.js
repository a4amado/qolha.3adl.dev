"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rate_controller_1 = require("../controllers/rate.controller");
const route = (0, express_1.Router)();
route.post("/:clipID", rate_controller_1.appendRate);
exports.default = route;
