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
exports.streamClip = exports.rejectClip = exports.acceptClip = exports.appendClip = exports.getClipThatNeedsToBeReviewed = exports.listClipsForWord = void 0;
const zod_1 = require("zod");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getQueryItem_1 = __importDefault(require("../utils/getQueryItem"));
const uuid_1 = require("uuid");
const node_path_1 = require("node:path");
const prismadb_1 = __importDefault(require("../utils/prismadb"));
const node_fs_1 = require("node:fs");
const listClipsSchema = zod_1.z.object({
    wordID: zod_1.z.string().uuid(),
});
function listClipsForWord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ChecklistClipsSchema = listClipsSchema.safeParse(req);
        if (!ChecklistClipsSchema.success) {
            res.status(http_status_codes_1.default.NOT_ACCEPTABLE).json(ChecklistClipsSchema.error.errors);
            return;
        }
        try {
            const clips = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.word.findFirst({
                where: {
                    id: (0, getQueryItem_1.default)(req.query.wordID),
                },
                select: {
                    ar: true,
                    clips: {
                        select: {
                            createBy: {
                                select: {
                                    name: true,
                                },
                            },
                            id: true,
                            path: true,
                        },
                        take: 15,
                    },
                },
            }));
            res.status(http_status_codes_1.default.OK).send(clips);
        }
        catch (error) {
            return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}
exports.listClipsForWord = listClipsForWord;
;
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
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    });
}
exports.getClipThatNeedsToBeReviewed = getClipThatNeedsToBeReviewed;
function appendClip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const word = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.clip.create({
                data: {
                    path: req.file.filename,
                    // @ts-ignore
                    userID: req.session.id,
                    wordID: (0, getQueryItem_1.default)(req.body.wordID),
                    id: (0, uuid_1.v4)(),
                },
            }));
            return res.status(http_status_codes_1.default.OK).json(word);
        }
        catch (error) {
            return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send(error);
        }
    });
}
exports.appendClip = appendClip;
;
const acceptClipSchema = zod_1.z.object({
    clipID: zod_1.z.string().uuid(),
});
function acceptClip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const acceptClipSchemaResult = acceptClipSchema.safeParse(req.query);
        if (!acceptClipSchemaResult.success) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json(http_status_codes_1.default.getStatusText(http_status_codes_1.default.BAD_REQUEST));
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
            return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    });
}
exports.acceptClip = acceptClip;
function rejectClip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const acceptClipSchemaResult = acceptClipSchema.safeParse(req.query);
        if (!acceptClipSchemaResult.success) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json(http_status_codes_1.default.getStatusText(http_status_codes_1.default.BAD_REQUEST));
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
            return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    });
}
exports.rejectClip = rejectClip;
const streamClipSchema = zod_1.z.object({
    clipID: zod_1.z.string().uuid(),
});
function streamClip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const clipCheck = streamClipSchema.safeParse(req.query);
        if (!clipCheck.success) {
            res.status(http_status_codes_1.default.BAD_REQUEST).json(http_status_codes_1.default.getStatusText(http_status_codes_1.default.BAD_REQUEST));
            return;
        }
        try {
            const clip = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.clip.findUnique({ where: { id: (0, getQueryItem_1.default)(req.query.clipID) } }));
            if (!(clip === null || clip === void 0 ? void 0 : clip.id))
                throw "Clip Not Found";
            const stream = (0, node_fs_1.createReadStream)((0, node_path_1.join)(process.cwd(), "files", "clips", clip === null || clip === void 0 ? void 0 : clip.path));
            stream.on("error", (error) => {
                return res.status(http_status_codes_1.default.BAD_REQUEST).send(error);
            });
            stream.pipe(res);
        }
        catch (error) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).send(error);
        }
    });
}
exports.streamClip = streamClip;
