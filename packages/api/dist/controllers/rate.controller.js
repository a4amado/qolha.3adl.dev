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
exports.appendRate = void 0;
const zod_1 = require("zod");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getQueryItem_1 = __importDefault(require("../utils/getQueryItem"));
const uuid_1 = require("uuid");
const appendRateSchema = zod_1.z.object({
    query: zod_1.z.object({
        clipID: zod_1.z.string().uuid(),
    }),
    body: zod_1.z.object({
        rate: zod_1.z.enum(["0", "50", "100"]),
    }),
});
function appendRate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const CheckAppendRateSchema = appendRateSchema.safeParse(req);
        if (!CheckAppendRateSchema.success) {
            res.status(http_status_codes_1.default.BAD_REQUEST).json(CheckAppendRateSchema.error);
            return;
        }
        try {
            const clipRate = yield (prisma === null || prisma === void 0 ? void 0 : prisma.rate.findFirst({
                where: {
                    AND: {
                        clipID: (0, getQueryItem_1.default)(req.query.clipID),
                        // @ts-ignore
                        userID: req.session.id,
                    },
                },
            }));
            const newClipRate = yield (prisma === null || prisma === void 0 ? void 0 : prisma.rate.upsert({
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
            return res.status(http_status_codes_1.default.BAD_REQUEST).json(error);
        }
    });
}
exports.appendRate = appendRate;
