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
exports.appendClipToWord = exports.listClipsForWord = exports.getWordWithTheLeastClips = exports.appendWord = exports.QueryWord = void 0;
const zod_1 = require("zod");
const prismadb_1 = __importDefault(require("../utils/prismadb"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getQueryItem_1 = __importDefault(require("../utils/getQueryItem"));
const uuid_1 = require("uuid");
const QueryWordSchema = zod_1.z.object({
    wordID: zod_1.z.string().uuid("Invalid wordID"),
});
const appendWordSchema = zod_1.z.object({
    word: zod_1.z.string(),
});
function QueryWord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const s = QueryWordSchema.safeParse(req.query);
        if (!s.success)
            return res.status(http_status_codes_1.default.UNPROCESSABLE_ENTITY).send(s.error.errors);
        const word = yield prismadb_1.default.word.findFirst({
            where: {
                id: (0, getQueryItem_1.default)(req.query.wordID),
            },
        });
        return res.status(http_status_codes_1.default.OK).send(word);
    });
}
exports.QueryWord = QueryWord;
function appendWord(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const checkAppendWord = appendWordSchema.safeParse(req.query);
        if (!checkAppendWord.success)
            return res.status(http_status_codes_1.default.BAD_REQUEST).json(checkAppendWord.error.errors);
        const word = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.word.create({
            data: {
                ar: (0, getQueryItem_1.default)(req.query.word),
                // @ts-ignore
                userId: (_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.id,
                id: (0, uuid_1.v4)(),
            },
        }));
        return res.status(http_status_codes_1.default.OK).send(word);
    });
}
exports.appendWord = appendWord;
function getWordWithTheLeastClips(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const word = yield (prismadb_1.default === null || prismadb_1.default === void 0 ? void 0 : prismadb_1.default.word.findFirst({
            select: {
                ar: true,
                id: true,
                createBy: { select: { name: true, id: true } },
            },
            orderBy: {
                clips: {
                    _count: "asc",
                },
            },
            take: 1,
        }));
        return res.json(word);
    });
}
exports.getWordWithTheLeastClips = getWordWithTheLeastClips;
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
    });
}
exports.listClipsForWord = listClipsForWord;
function appendClipToWord(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof req.file === "undefined") {
            return next({
                code: http_status_codes_1.default.UNPROCESSABLE_ENTITY,
                msg: http_status_codes_1.default.getStatusText(http_status_codes_1.default.UNPROCESSABLE_ENTITY),
            });
        }
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
    });
}
exports.appendClipToWord = appendClipToWord;
