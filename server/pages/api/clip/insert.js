"use strict";
(() => {
var exports = {};
exports.id = 41;
exports.ids = [41,748];
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

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 2113:
/***/ ((module) => {

module.exports = require("next-auth/next");

/***/ }),

/***/ 3598:
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ 2316:
/***/ ((module) => {

module.exports = require("request-ip");

/***/ }),

/***/ 5609:
/***/ ((module) => {

module.exports = require("yup");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 7282:
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ 426:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ middleware_MicroFormidable)
});

;// CONCATENATED MODULE: external "formidable"
const external_formidable_namespaceObject = require("formidable");
;// CONCATENATED MODULE: ./backend/middleware/MicroFormidable.ts

class MicroFormidable extends external_formidable_namespaceObject.Formidable {
    constructor(...q){
        super(...q);
    }
    single(fieldName) {
        return (req, res, next)=>{
            return this.parse(req, (err, fields, files)=>{
                if (err) {
                    console.error(err);
                    res.status(500).json({
                        error: "Error uploading file."
                    });
                    return;
                }
                const file = files[fieldName];
                if (typeof file === "undefined") {
                    return res.status(500).json({
                        error: `file ${fieldName} is required`
                    });
                }
                if (Array.isArray(file)) {
                    return res.status(500).json({
                        error: `file ${fieldName} should only be one file`
                    });
                }
                req[fieldName] = file;
                return next();
            });
        };
    }
}
/* harmony default export */ const middleware_MicroFormidable = (MicroFormidable);


/***/ }),

/***/ 406:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8010);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_pages_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8683);
/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2113);
/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_next__WEBPACK_IMPORTED_MODULE_2__);



const withAuth = async (req, res, next)=>{
    const user = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(req, res, (0,src_pages_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_1__.authOptions)(req, res));
    if (!user?.expires) {
        return res.status(http_status_codes__WEBPACK_IMPORTED_MODULE_0__.StatusCodes.UNAUTHORIZED).send({
            message: [
                http_status_codes__WEBPACK_IMPORTED_MODULE_0__.ReasonPhrases.UNAUTHORIZED
            ]
        });
    }
    // @ts-ignore
    req.user = user.user;
    return next();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (withAuth);


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

/***/ 6771:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8010);
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_status_codes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _backend_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1116);
/* harmony import */ var _backend_utils_validate_yup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9376);
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5616);
/* harmony import */ var _backend_middleware_withAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(406);
/* harmony import */ var _backend_middleware_MicroFormidable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(426);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _schema_clip_insert_clip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9050);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_2__]);
next_connect__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









const route = (0,next_connect__WEBPACK_IMPORTED_MODULE_2__["default"])();
const uploader = new _backend_middleware_MicroFormidable__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z({
    uploadDir: (0,path__WEBPACK_IMPORTED_MODULE_5__.join)(process.cwd(), "files", "clips"),
    filename: ()=>`clip-from-user${(0,crypto__WEBPACK_IMPORTED_MODULE_6__.randomUUID)()}`
});
// @ts-ignore
route.post(_backend_middleware_withAuth__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, uploader.single("clip"), async (req, res)=>{
    const { data: Input, errors } = (0,_backend_utils_validate_yup__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)(_schema_clip_insert_clip__WEBPACK_IMPORTED_MODULE_7__/* .Schema$API$InsertClip */ .p, req);
    if (errors.length > 0) return res.status((http_status_codes__WEBPACK_IMPORTED_MODULE_0___default().BAD_REQUEST)).send({
        message: errors
    });
    const clip = await _backend_db__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z.clip.create({
        data: {
            // @ts-ignore
            clipName: req.clip.newFilename,
            // @ts-ignore
            userId: req.user.id,
            wordId: Input.query.wordId,
            accept: false,
            reject: false
        }
    });
    if (!clip) {
        return res.status((http_status_codes__WEBPACK_IMPORTED_MODULE_0___default().INTERNAL_SERVER_ERROR)).send({
            message: [
                "Internal Server Error"
            ]
        });
    }
    return res.status((http_status_codes__WEBPACK_IMPORTED_MODULE_0___default().OK)).send(clip);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (route);
const config = {
    api: {
        bodyParser: false
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9050:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ Schema$API$InsertClip)
/* harmony export */ });
/* unused harmony export Schema$Client$InsertClip */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$InsertClip = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
        wordId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
    })
});
const Schema$Client$InsertClip = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    wordId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
});



/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [683], () => (__webpack_exec__(6771)));
module.exports = __webpack_exports__;

})();