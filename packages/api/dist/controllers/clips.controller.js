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
exports.appendRate = exports.rejectClip = exports.acceptClip = exports.getClipThatNeedsToBeReviewed = exports.streamClip = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getQueryItem_1 = __importDefault(require("../utils/getQueryItem"));
const uuid_1 = require("uuid");
const node_path_1 = require("node:path");
const prismadb_1 = __importDefault(require("../utils/prismadb"));
const node_fs_1 = require("node:fs");
const yup = __importStar(require("yup"));
const validate_yup_1 = __importDefault(require("../utils/validate.yup"));
const exception_1 = require("../utils/exception");
const streamClipSchema = yup.object().shape({
    clipID: yup.string().uuid().required(),
});
function streamClip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const clipCheck = (0, validate_yup_1.default)(streamClipSchema, req.query);
        if (clipCheck.errors.length > 0) {
            return (0, exception_1.YupException)(res, clipCheck.errors);
        }
        try {
            const clip = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.clip.findUniqueOrThrow({ where: { id: (0, getQueryItem_1.default)(req.query.clipID) } }));
            const stream = (0, node_fs_1.createReadStream)((0, node_path_1.join)(process.cwd(), "files", "clips", clip === null || clip === void 0 ? void 0 : clip.path));
            stream.on("error", (error) => {
                return (0, exception_1.InternalException)(res);
            });
            stream.pipe(res);
        }
        catch (error) {
            res.status(404).end();
        }
    });
}
exports.streamClip = streamClip;
function getClipThatNeedsToBeReviewed(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clips = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.clip.findMany({
                where: {
                    accepted: false,
                    rejected: false,
                },
                select: {
                    word: {
                        select: {
                            ar: true,
                            id: true,
                        },
                    },
                    id: true,
                    path: true,
                },
                take: 5,
            }));
            res.status(http_status_codes_1.default.OK).json(clips);
        }
        catch (error) {
            (0, exception_1.InternalException)(res);
        }
    });
}
exports.getClipThatNeedsToBeReviewed = getClipThatNeedsToBeReviewed;
const acceptClipSchema = yup.object().shape({
    clipID: yup.string().uuid().required(),
});
function acceptClip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const acceptClipSchemaResult = (0, validate_yup_1.default)(acceptClipSchema, req.query);
        if (acceptClipSchemaResult.errors.length > 0) {
            return (0, exception_1.YupException)(res, acceptClipSchemaResult.errors);
        }
        try {
            const clipStatus = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.clip.update({
                where: {
                    id: (0, getQueryItem_1.default)(req.query.clipID),
                },
                data: {
                    accepted: true,
                    rejected: false,
                },
            }));
            return res.status(http_status_codes_1.default.OK).json(clipStatus);
        }
        catch (error) {
            return (0, exception_1.InternalException)(res);
        }
    });
}
exports.acceptClip = acceptClip;
function rejectClip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const acceptClipSchemaResult = (0, validate_yup_1.default)(acceptClipSchema, req.query);
        if (acceptClipSchemaResult.errors.length > 0) {
            return (0, exception_1.YupException)(res, acceptClipSchemaResult.errors);
        }
        try {
            const clipStatus = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.clip.update({
                where: {
                    id: (0, getQueryItem_1.default)(req.query.clipID),
                },
                data: {
                    accepted: false,
                    rejected: true,
                },
            }));
            return res.status(http_status_codes_1.default.OK).json(clipStatus);
        }
        catch (error) {
            return (0, exception_1.InternalException)(res);
        }
    });
}
exports.rejectClip = rejectClip;
const appendRateSchema = yup.object().shape({
    query: yup.object().shape({
        clipID: yup.string().uuid(),
    }),
    body: yup.object().shape({
        rate: yup.string().oneOf(["0", "50", "100"]),
    }),
});
function appendRate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const CheckAppendRateSchema = (0, validate_yup_1.default)(appendRateSchema, req);
        if (CheckAppendRateSchema.errors.length > 0) {
            return (0, exception_1.YupException)(res, CheckAppendRateSchema.errors);
        }
        try {
            const clipRate = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.rate.findFirst({
                where: {
                    AND: {
                        clipID: (0, getQueryItem_1.default)(req.query.clipID),
                        // @ts-ignore
                        userID: req.session.id,
                    },
                },
            }));
            const newClipRate = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.rate.upsert({
                create: {
                    clipID: (0, getQueryItem_1.default)(req.query.clipID),
                    // @ts-ignore
                    userID: req.session.id,
                    rate: Number((0, getQueryItem_1.default)(req.body.rate)),
                    id: (0, uuid_1.v4)(),
                },
                update: {
                    rate: Number((0, getQueryItem_1.default)(req.body.rate)),
                },
                where: {
                    id: (clipRate === null || clipRate === void 0 ? void 0 : clipRate.id) || "",
                },
            }));
        }
        catch (error) {
        }
    });
}
exports.appendRate = appendRate;
