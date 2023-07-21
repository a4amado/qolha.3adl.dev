"use strict";
(() => {
var exports = {};
exports.id = 404;
exports.ids = [404];
exports.modules = {

/***/ 2104:
/***/ ((module) => {

module.exports = require("@next-auth/prisma-adapter");

/***/ }),

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 8010:
/***/ ((module) => {

module.exports = require("http-status-codes");

/***/ }),

/***/ 5609:
/***/ ((module) => {

module.exports = require("yup");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 7561:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7282:
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ 1116:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ AuthPrisma),
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7282);
/* harmony import */ var process__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(process__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2104);
/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__);



const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({
    log: process__WEBPACK_IMPORTED_MODULE_1__.env.NODE_ENV === "development" ? [
        "query",
        "error",
        "warn"
    ] : [
        "error"
    ]
});
if (process__WEBPACK_IMPORTED_MODULE_1__.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
const AuthPrisma = (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__.PrismaAdapter)(prisma);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);



/***/ }),

/***/ 9376:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ validateYupSchema)
/* harmony export */ });
function validateYupSchema(schema, data) {
    try {
        const validatedData = schema.validateSync(data, {
            abortEarly: false
        });
        return {
            errors: [],
            data: validatedData
        };
    } catch (err) {
        console.log(err);
        // @ts-ignore
        const errors = err.inner.map((e)=>e.message);
        return {
            // @ts-ignore
            errors: errors,
            data: null
        };
    }
}


/***/ }),

/***/ 9010:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var _backend_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1116);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8010);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _backend_utils_validate_yup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9376);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7561);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _schema_clip_stream_clip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7780);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const route = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])();
route.get(async (req, res)=>{
    const { data: Input, errors } = (0,_backend_utils_validate_yup__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(_schema_clip_stream_clip__WEBPACK_IMPORTED_MODULE_5__/* .Schema$API$StreamClip */ .y, req);
    if (errors.length > 0) return res.status((http_status_codes__WEBPACK_IMPORTED_MODULE_2___default().BAD_REQUEST)).send({
        message: errors
    });
    const clip = await _backend_db__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z.clip.findFirst({
        where: {
            id: Input.query.clipId
        },
        select: {
            clipName: true,
            id: true
        }
    });
    if (!clip) {
        return res.status((http_status_codes__WEBPACK_IMPORTED_MODULE_2___default().NOT_FOUND)).send({
            message: [
                "clip Not Found"
            ]
        });
    }
    const stream = (0,node_fs__WEBPACK_IMPORTED_MODULE_3__.createReadStream)((0,path__WEBPACK_IMPORTED_MODULE_4__.join)(process.cwd(), "files", "clips", clip.clipName));
    stream.on("error", (error)=>{
        console.error(errors);
        return res.status((http_status_codes__WEBPACK_IMPORTED_MODULE_2___default().INTERNAL_SERVER_ERROR)).send({
            message: [
                "Faild To stream the Clip"
            ]
        });
    });
    stream.pipe(res);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (route);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7780:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ Schema$API$StreamClip)
/* harmony export */ });
/* unused harmony export Schema$Client$StreamClip */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$StreamClip = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
        clipId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
    })
});
const Schema$Client$StreamClip = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    clipId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
});



/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9010));
module.exports = __webpack_exports__;

})();