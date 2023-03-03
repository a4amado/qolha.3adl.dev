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
exports.signIn = exports.signUp = void 0;
const prismadb_1 = __importDefault(require("../utils/prismadb"));
const yup = __importStar(require("yup"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcrypt_1 = require("bcrypt");
const getQueryItem_1 = __importDefault(require("../utils/getQueryItem"));
const jsonwebtoken_1 = require("jsonwebtoken");
const validate_yup_1 = __importDefault(require("../utils/validate.yup"));
const exception_1 = require("../utils/exception");
const singUpSchema = yup.object().shape({
    username: yup.string().required().min(4),
    password: yup.string().min(10).required(),
    vPassword: yup
        .string()
        .oneOf([yup.ref("password")], "passwords does not match")
        .required(),
    email: yup.string().email().required(),
});
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDataValid = (0, validate_yup_1.default)(singUpSchema, req.body);
        if (isDataValid.errors.length > 0) {
            return (0, exception_1.YupException)(res, isDataValid.errors);
        }
        try {
            let user = yield prismadb_1.default.user.findFirst({
                where: {
                    email: (0, getQueryItem_1.default)(req.body.email),
                },
            });
            if (user) {
                res.status(http_status_codes_1.default.CONFLICT).send(["Email Already in Use"]);
            }
        }
        catch (error) {
            return (0, exception_1.InternalException)(res);
        }
        let new_user;
        try {
            new_user = yield prismadb_1.default.user.create({
                data: {
                    email: (0, getQueryItem_1.default)(req.body.email),
                    role: "none",
                },
            });
            yield prismadb_1.default.account.create({
                // @ts-ignore
                data: {
                    // @ts-ignore
                    userID: user === null || user === void 0 ? void 0 : user.id,
                    hash: (0, bcrypt_1.hashSync)(req.body.password, 11),
                },
            });
        }
        catch (error) {
            return (0, exception_1.InternalException)(res);
        }
        res.status(http_status_codes_1.default.OK).end();
    });
}
exports.signUp = signUp;
const singInSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(10),
});
function signIn(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const isDataVlaid = (0, validate_yup_1.default)(singInSchema, req.body);
        if (isDataVlaid.errors.length > 0) {
            return (0, exception_1.YupException)(res, isDataVlaid.errors);
        }
        let user;
        try {
            user = yield prismadb_1.default.user.findUniqueOrThrow({
                where: {
                    email: req.body.email,
                },
                select: {
                    account: {
                        select: {
                            hash: true,
                        },
                    },
                    email: true,
                    role: true,
                    id: true,
                },
            });
            if (!((_a = user === null || user === void 0 ? void 0 : user.account) === null || _a === void 0 ? void 0 : _a.hash)) {
                return res.status(http_status_codes_1.default.NOT_FOUND).end();
            }
        }
        catch (error) {
            return (0, exception_1.InternalException)(res);
        }
        const is_password_correct = (0, bcrypt_1.compareSync)(req.body.data, (_b = user === null || user === void 0 ? void 0 : user.account) === null || _b === void 0 ? void 0 : _b.hash);
        if (!is_password_correct) {
            return res.status(http_status_codes_1.default.NOT_ACCEPTABLE).send("wrong password or email");
        }
        res.cookie("token", (0, jsonwebtoken_1.sign)({
            role: user.role,
            id: user.id,
        }, "sadsd ", {
            expiresIn: "12h",
        }));
        res.status(http_status_codes_1.default.OK).send(http_status_codes_1.default.getStatusText(http_status_codes_1.default.OK));
    });
}
exports.signIn = signIn;
