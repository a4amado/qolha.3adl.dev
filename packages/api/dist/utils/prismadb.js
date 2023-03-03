"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// @ts-ignore
const client = globalThis.prisma || new client_1.PrismaClient({
    log: ["error", "info", "query", "warn"],
    errorFormat: "minimal"
});
// @ts-ignore
if (process.env.NODE_ENV !== "production")
    globalThis.prisma = client;
exports.default = client;
