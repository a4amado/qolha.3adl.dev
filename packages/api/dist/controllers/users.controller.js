"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUser = exports.getUser = void 0;
const yup = __importStar(require("yup"));
const getQueryItem_1 = __importDefault(require("../utils/getQueryItem"));
const prismadb_1 = __importDefault(require("../utils/prismadb"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getUserShema = yup.object().shape({
    userID: yup.string().required().uuid(),
});
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        getUserShema.validateSync(req.query);
        const user = yield prismadb_1.default.user.findUnique({
            where: {
                id: (0, getQueryItem_1.default)(req.query.userID),
            },
            select: {
                name: true,
                id: true,
                _count: {
                    select: {
                        words: true,
                        clips: true,
                    },
                },
            },
        });
        if (!user) {
            return res.status(http_status_codes_1.default.NOT_FOUND).send(http_status_codes_1.default.getStatusText(http_status_codes_1.default.NOT_FOUND));
        }
        res.status(http_status_codes_1.default.OK).send(user);
    });
}
exports.getUser = getUser;
const deleteAccountSchema = yup.object().shape({
    userID: yup.string().uuid().required(),
});
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        deleteAccountSchema.validateSync(req.query);
        yield prismadb_1.default.user.delete({
            where: {
                id: req.body.userID,
            },
        });
        res.status(http_status_codes_1.default.OK).end();
    });
}
exports.deleteUser = deleteUser;
