"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getQueryItem(q) {
    return Array.isArray(q) ? q[0] : q;
}
exports.default = getQueryItem;
