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
exports.queryHits = void 0;
const uuid_1 = require("uuid");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
function queryHits(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((reso) => {
            setTimeout(() => {
                res.status(http_status_codes_1.default.OK).json(Array.from({ length: 10 }, () => ({
                    ar: "أنا",
                    id: (0, uuid_1.v4)(),
                })));
            }, 3000);
        });
    });
}
exports.queryHits = queryHits;
