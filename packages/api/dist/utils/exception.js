"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YupException = exports.InternalException = void 0;
const http_status_codes_1 = require("http-status-codes");
function InternalException(res) {
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send([http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR]);
}
exports.InternalException = InternalException;
function YupException(res, errors) {
    return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).send(errors);
}
exports.YupException = YupException;
