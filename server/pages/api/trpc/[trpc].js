"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829,748];
exports.modules = {

/***/ 2104:
/***/ ((module) => {

module.exports = require("@next-auth/prisma-adapter");

/***/ }),

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

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

/***/ 2937:
/***/ ((module) => {

module.exports = import("@trpc/server");;

/***/ }),

/***/ 6282:
/***/ ((module) => {

module.exports = import("@trpc/server/adapters/next");;

/***/ }),

/***/ 7282:
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ 2444:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6282);
/* harmony import */ var _server_routers_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8954);
/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2113);
/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_next__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_pages_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6041);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5196);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__, _server_routers_app__WEBPACK_IMPORTED_MODULE_1__]);
([_trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__, _server_routers_app__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





async function createContext({ req , res  }) {
    const b = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(req, res, (0,src_pages_api_auth_nextauth___WEBPACK_IMPORTED_MODULE_3__.authOptions)(req, res));
    if (!b) return {};
    const user = await _db__WEBPACK_IMPORTED_MODULE_4__/* ["default"].user.findUnique */ .Z.user.findUnique({
        where: {
            email: b?.user?.email || ""
        }
    });
    console.log(user);
    if (!user) return {};
    return {
        user
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__.createNextApiHandler({
    router: _server_routers_app__WEBPACK_IMPORTED_MODULE_1__/* .appRouter */ .q,
    createContext: createContext
}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2642:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ Schema$Client$AcceptClip)
/* harmony export */ });
/* unused harmony export Schema$API$AcceptClip */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$AcceptClip = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
        clipId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
    })
});
const Schema$Client$AcceptClip = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    clipId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
});



/***/ }),

/***/ 3916:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ Schema$Client$QueryClip)
/* harmony export */ });
/* unused harmony export Schema$API$QueryClip */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$QueryClip = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
        _wordId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().optional(),
        _userId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().optional(),
        _page: yup__WEBPACK_IMPORTED_MODULE_0__.number().integer().min(1).default(1).optional(),
        _order: yup__WEBPACK_IMPORTED_MODULE_0__.string().oneOf([
            "asc",
            "desc"
        ]).optional(),
        _sort: yup__WEBPACK_IMPORTED_MODULE_0__.string().oneOf([
            "createdAt"
        ]).optional(),
        _limit: yup__WEBPACK_IMPORTED_MODULE_0__.number().integer().min(1).max(10).default(1).optional(),
        _accepted: yup__WEBPACK_IMPORTED_MODULE_0__.boolean().optional()
    })
});
const Schema$Client$QueryClip = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    _wordId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().optional(),
    _userId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().optional(),
    _page: yup__WEBPACK_IMPORTED_MODULE_0__.number().integer().min(1).default(1).optional(),
    _order: yup__WEBPACK_IMPORTED_MODULE_0__.string().oneOf([
        "asc",
        "desc"
    ]).optional(),
    _sort: yup__WEBPACK_IMPORTED_MODULE_0__.string().oneOf([
        "createdAt"
    ]).optional(),
    _limit: yup__WEBPACK_IMPORTED_MODULE_0__.number().integer().min(1).max(10).default(1).optional(),
    _accepted: yup__WEBPACK_IMPORTED_MODULE_0__.boolean().optional()
});



/***/ }),

/***/ 9166:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ Schema$Client$InsertRate)
/* harmony export */ });
/* unused harmony export Schema$API$InsertRate */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$InsertRate = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
        clipId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required(),
        rate: yup__WEBPACK_IMPORTED_MODULE_0__.number().oneOf([
            0,
            50,
            100
        ]).required()
    })
});
const Schema$Client$InsertRate = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    rate: yup__WEBPACK_IMPORTED_MODULE_0__.number().oneOf([
        0,
        50,
        100
    ]).required(),
    clipId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
});



/***/ }),

/***/ 6351:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ Schema$Client$BanUser)
/* harmony export */ });
/* unused harmony export Schema$API$BanUser */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$BanUser = yup__WEBPACK_IMPORTED_MODULE_0__.object({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object({
        userId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
    })
});
const Schema$Client$BanUser = yup__WEBPACK_IMPORTED_MODULE_0__.object({
    userId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
});



/***/ }),

/***/ 9852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ Schema$Client$DeleteUser)
/* harmony export */ });
/* unused harmony export Schema$API$DeleteUser */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$DeleteUser = yup__WEBPACK_IMPORTED_MODULE_0__.object({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object({
        userId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
    })
});
const Schema$Client$DeleteUser = yup__WEBPACK_IMPORTED_MODULE_0__.object({
    userId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
});



/***/ }),

/***/ 9406:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ Schema$Client$UserQuery)
/* harmony export */ });
/* unused harmony export Schema$API$UserQuery */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$UserQuery = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object({
        _email: yup__WEBPACK_IMPORTED_MODULE_0__.string().email().when("_userId", {
            // @ts-ignore
            is: (userID)=>typeof userID === "undefined",
            then: ()=>yup__WEBPACK_IMPORTED_MODULE_0__.string().required("Either _email or _userId is required"),
            otherwise: ()=>yup__WEBPACK_IMPORTED_MODULE_0__.string().optional()
        }),
        _userId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().optional()
    })
});
const Schema$Client$UserQuery = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    _email: yup__WEBPACK_IMPORTED_MODULE_0__.string().email().when("_userId", {
        // @ts-ignore
        is: (userID)=>typeof userID === "undefined",
        then: ()=>yup__WEBPACK_IMPORTED_MODULE_0__.string().required("Either _email or _userId is required"),
        otherwise: ()=>yup__WEBPACK_IMPORTED_MODULE_0__.string().optional()
    }),
    _userId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid()
});



/***/ }),

/***/ 3088:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ Schema$Client$DeleteWord)
/* harmony export */ });
/* unused harmony export Schema$API$DeleteWord */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$DeleteWord = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    query: yup__WEBPACK_IMPORTED_MODULE_0__.object({
        wordId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
    })
});
const Schema$Client$DeleteWord = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    wordId: yup__WEBPACK_IMPORTED_MODULE_0__.string().uuid().required()
});



/***/ }),

/***/ 4455:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ Schema$Client$InsertWord)
/* harmony export */ });
/* unused harmony export Schema$API$InsertWord */
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);

const Schema$API$InsertWord = yup__WEBPACK_IMPORTED_MODULE_0__.object({
    body: yup__WEBPACK_IMPORTED_MODULE_0__.object({
        word: yup__WEBPACK_IMPORTED_MODULE_0__.string().required()
    })
});
const Schema$Client$InsertWord = yup__WEBPACK_IMPORTED_MODULE_0__.object().shape({
    word: yup__WEBPACK_IMPORTED_MODULE_0__.string().required().required(),
    description_ar: yup__WEBPACK_IMPORTED_MODULE_0__.string(),
    description_en: yup__WEBPACK_IMPORTED_MODULE_0__.string()
});



/***/ }),

/***/ 8954:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ appRouter)
/* harmony export */ });
/* harmony import */ var _trpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2075);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6223);
/* harmony import */ var _clip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1467);
/* harmony import */ var _word__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3464);
/* harmony import */ var _rate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4270);
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6981);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc__WEBPACK_IMPORTED_MODULE_0__, _user__WEBPACK_IMPORTED_MODULE_1__, _clip__WEBPACK_IMPORTED_MODULE_2__, _word__WEBPACK_IMPORTED_MODULE_3__, _rate__WEBPACK_IMPORTED_MODULE_4__, _search__WEBPACK_IMPORTED_MODULE_5__]);
([_trpc__WEBPACK_IMPORTED_MODULE_0__, _user__WEBPACK_IMPORTED_MODULE_1__, _clip__WEBPACK_IMPORTED_MODULE_2__, _word__WEBPACK_IMPORTED_MODULE_3__, _rate__WEBPACK_IMPORTED_MODULE_4__, _search__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const appRouter = (0,_trpc__WEBPACK_IMPORTED_MODULE_0__/* .router */ .Nd)({
    word: _word__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
    user: _user__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    clip: _clip__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
    rate: _rate__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,
    search: _search__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z
});


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8385:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_clip_accept_clip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2642);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const AcceptClip = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .adminProcedure.input */ .qF.input(_schema_clip_accept_clip__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$AcceptClip */ .H).mutation(async (opts)=>{
    const acceptedClip = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].clip.update */ .Z.clip.update({
        where: {
            id: opts.input.clipId
        },
        data: {
            accept: true
        }
    });
    return acceptedClip;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcceptClip);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8612:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_1__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const getClipThatNeedsRevision = src_server_trpc__WEBPACK_IMPORTED_MODULE_1__/* .publicProcedure.query */ .$y.query(async (opts)=>{
    const clip = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].clip.findMany */ .Z.clip.findMany({
        where: {
            accept: false
        },
        select: {
            id: true,
            word: {
                select: {
                    ar: true
                }
            },
            clipName: true,
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        take: 15
    });
    return {
        clips: clip
    };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getClipThatNeedsRevision);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1467:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2075);
/* harmony import */ var _getClipThatNeedsRevision__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8612);
/* harmony import */ var _acceptClip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8385);
/* harmony import */ var _rejectClip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6272);
/* harmony import */ var _queryClip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3633);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_0__, _getClipThatNeedsRevision__WEBPACK_IMPORTED_MODULE_1__, _acceptClip__WEBPACK_IMPORTED_MODULE_2__, _rejectClip__WEBPACK_IMPORTED_MODULE_3__, _queryClip__WEBPACK_IMPORTED_MODULE_4__]);
([src_server_trpc__WEBPACK_IMPORTED_MODULE_0__, _getClipThatNeedsRevision__WEBPACK_IMPORTED_MODULE_1__, _acceptClip__WEBPACK_IMPORTED_MODULE_2__, _rejectClip__WEBPACK_IMPORTED_MODULE_3__, _queryClip__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const clipRouter = (0,src_server_trpc__WEBPACK_IMPORTED_MODULE_0__/* .router */ .Nd)({
    getClipThatNeedsRevision: _getClipThatNeedsRevision__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    accept: _acceptClip__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
    reject: _rejectClip__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
    query: _queryClip__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clipRouter);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3633:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_clip_query_clip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3916);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const queryClip = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .publicProcedure.input */ .$y.input(_schema_clip_query_clip__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$QueryClip */ .f).query(async (opts)=>{
    const query = {};
    if (opts.input._userId) {
        query.where = {
            userId: opts.input._userId
        };
    }
    if (opts.input._wordId) {
        query.where = {
            ...query.where,
            wordId: opts.input._wordId
        };
    }
    if (opts.input._order) {
        query.take = opts.input._limit;
    }
    query.select = {};
    const clips = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].clip.findMany */ .Z.clip.findMany(query);
    return clips;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (queryClip);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6272:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_clip_accept_clip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2642);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const rejectClip = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .adminProcedure.input */ .qF.input(_schema_clip_accept_clip__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$AcceptClip */ .H).mutation(async (opts)=>{
    const deletedClip = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].clip["delete"] */ .Z.clip["delete"]({
        where: {
            id: opts.input.clipId
        }
    });
    return deletedClip;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rejectClip);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4270:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2075);
/* harmony import */ var _insertRate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2364);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_0__, _insertRate__WEBPACK_IMPORTED_MODULE_1__]);
([src_server_trpc__WEBPACK_IMPORTED_MODULE_0__, _insertRate__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


const rateRouter = (0,src_server_trpc__WEBPACK_IMPORTED_MODULE_0__/* .router */ .Nd)({
    insert: _insertRate__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rateRouter);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2364:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_rate_insert_rate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9166);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const insertRate = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .publicProcedure.input */ .$y.input(_schema_rate_insert_rate__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$InsertRate */ .T).query(async (opts)=>{
    const clipRate = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].rate.upsert */ .Z.rate.upsert({
        create: {
            clipId: opts.input.clipId,
            // @ts-ignore
            userId: req.session.id,
            // @ts-ignore
            rate: opts.input.query.rate
        },
        update: {
            // @ts-ignore
            rate: opts.input.query.rate
        },
        where: {
            clipId_userId: {
                // @ts-ignore
                clipId: opts.input.query.rate,
                // @ts-ignore
                userId: req.session.id
            }
        }
    });
    return clipRate;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insertRate);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6981:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_1__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const searchRouter = (0,src_server_trpc__WEBPACK_IMPORTED_MODULE_1__/* .router */ .Nd)({
    searchWord: src_server_trpc__WEBPACK_IMPORTED_MODULE_1__/* .publicProcedure.query */ .$y.query(async ()=>{
        const ss = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].word.findMany */ .Z.word.findMany({
            where: {
                accepted: true
            },
            include: {
                clips: {
                    select: {
                        id: true
                    }
                }
            },
            orderBy: {
                clips: {
                    _count: "desc"
                }
            }
        });
        console.log(ss);
        return ss;
    })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (searchRouter);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8040:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_user_ban_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6351);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2937);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc_server__WEBPACK_IMPORTED_MODULE_2__, src_server_trpc__WEBPACK_IMPORTED_MODULE_3__]);
([_trpc_server__WEBPACK_IMPORTED_MODULE_2__, src_server_trpc__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const banUser = src_server_trpc__WEBPACK_IMPORTED_MODULE_3__/* .adminProcedure.input */ .qF.input(_schema_user_ban_user__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$BanUser */ .S).mutation(async (opts)=>{
    const user = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user.findUnique */ .Z.user.findUnique({
        where: {
            id: opts.input.userId
        }
    });
    if (user?.role === "owner") {
        throw new _trpc_server__WEBPACK_IMPORTED_MODULE_2__.TRPCError({
            code: "UNPROCESSABLE_CONTENT"
        });
    }
    const bannedUser = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user.update */ .Z.user.update({
        where: {
            id: opts.input.userId
        },
        data: {
            banned: new Date()
        }
    });
    await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].session.deleteMany */ .Z.session.deleteMany({
        where: {
            userId: opts.input.userId
        }
    });
    return bannedUser;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (banUser);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4079:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_user_delete_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9852);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const deleteUser = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .adminProcedure.input */ .qF.input(_schema_user_delete_user__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$DeleteUser */ .w).mutation(async (opts)=>{
    const deletedAccount = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user["delete"] */ .Z.user["delete"]({
        where: {
            id: opts.input.userId
        }
    });
    return deletedAccount;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteUser);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6223:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2075);
/* harmony import */ var _query_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7137);
/* harmony import */ var _ban_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8040);
/* harmony import */ var _delete_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4079);
/* harmony import */ var _unbanUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9890);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_0__, _query_user__WEBPACK_IMPORTED_MODULE_1__, _ban_user__WEBPACK_IMPORTED_MODULE_2__, _delete_user__WEBPACK_IMPORTED_MODULE_3__, _unbanUser__WEBPACK_IMPORTED_MODULE_4__]);
([src_server_trpc__WEBPACK_IMPORTED_MODULE_0__, _query_user__WEBPACK_IMPORTED_MODULE_1__, _ban_user__WEBPACK_IMPORTED_MODULE_2__, _delete_user__WEBPACK_IMPORTED_MODULE_3__, _unbanUser__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const userRouter = (0,src_server_trpc__WEBPACK_IMPORTED_MODULE_0__/* .router */ .Nd)({
    banUser: _ban_user__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
    unBanUser: _unbanUser__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,
    query$user: _query_user__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    deleteUser: _delete_user__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userRouter);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7137:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_user_query_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9406);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const QueryUser = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .publicProcedure.input */ .$y.input(_schema_user_query_user__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$UserQuery */ .A).query(async (opts)=>{
    const findUniqueWhere = {};
    if (opts.input._email) {
        findUniqueWhere.email = opts.input._email;
    } else {
        findUniqueWhere.id = opts.input._userId;
    }
    const user = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user.findFirst */ .Z.user.findFirst({
        where: findUniqueWhere
    });
    // if (user.error) return new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    return user;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QueryUser);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9890:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_user_ban_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6351);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const UnbanUser = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .adminProcedure.input */ .qF.input(_schema_user_ban_user__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$BanUser */ .S).mutation(async (opts)=>{
    const bannedUser = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user.update */ .Z.user.update({
        where: {
            id: opts.input.userId
        },
        data: {
            banned: new Date()
        }
    });
    await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].session.deleteMany */ .Z.session.deleteMany({
        where: {
            userId: opts.input.userId
        }
    });
    return bannedUser;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UnbanUser);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9039:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_word_delete_word__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3088);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const deleteWord = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .adminProcedure.input */ .qF.input(_schema_word_delete_word__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$DeleteWord */ .e).mutation(async (opts)=>{
    const deletedWord = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].word["delete"] */ .Z.word["delete"]({
        where: {
            id: opts.input.wordId
        }
    });
    return deletedWord;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deleteWord);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9635:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2075);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_1__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const getWord = src_server_trpc__WEBPACK_IMPORTED_MODULE_1__/* .publicProcedure.input */ .$y.input((0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().required().uuid()).query(async (opts)=>{
    const Word = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].word.findFirst */ .Z.word.findFirst({
        where: {
            id: opts.input
        },
        include: {
            clips: {
                take: 10
            }
        }
    });
    return Word;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWord);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7938:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_1__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const getWordThatNeedsClips = src_server_trpc__WEBPACK_IMPORTED_MODULE_1__/* .publicProcedure.query */ .$y.query(async (opts)=>{
    const word = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].word.findFirst */ .Z.word.findFirst({
        orderBy: {
            clips: {
                _count: "asc"
            }
        }
    });
    return word;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWordThatNeedsClips);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3464:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2075);
/* harmony import */ var _deleteWord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9039);
/* harmony import */ var _insertWord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8595);
/* harmony import */ var _getWordThatNeedsClips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7938);
/* harmony import */ var _getWord__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9635);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_0__, _deleteWord__WEBPACK_IMPORTED_MODULE_1__, _insertWord__WEBPACK_IMPORTED_MODULE_2__, _getWordThatNeedsClips__WEBPACK_IMPORTED_MODULE_3__, _getWord__WEBPACK_IMPORTED_MODULE_4__]);
([src_server_trpc__WEBPACK_IMPORTED_MODULE_0__, _deleteWord__WEBPACK_IMPORTED_MODULE_1__, _insertWord__WEBPACK_IMPORTED_MODULE_2__, _getWordThatNeedsClips__WEBPACK_IMPORTED_MODULE_3__, _getWord__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const wordRouter = (0,src_server_trpc__WEBPACK_IMPORTED_MODULE_0__/* .router */ .Nd)({
    deleteWord: _deleteWord__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z,
    insertWord: _insertWord__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
    getWordThatNeedsClips: _getWordThatNeedsClips__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
    getWord: _getWord__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (wordRouter);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8595:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5196);
/* harmony import */ var _schema_word_insert_word__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4455);
/* harmony import */ var src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2075);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([src_server_trpc__WEBPACK_IMPORTED_MODULE_2__]);
src_server_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const insertWord = src_server_trpc__WEBPACK_IMPORTED_MODULE_2__/* .protectedProcedure.input */ .U5.input(_schema_word_insert_word__WEBPACK_IMPORTED_MODULE_1__/* .Schema$Client$InsertWord */ .H).mutation(async (opts)=>{
    const word = await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].word.create */ .Z.word.create({
        data: {
            ar: opts.input.word,
            // @ts-ignore
            userId: opts.ctx.user.id,
            accepted: false,
            description_ar: opts.input.description_ar || "",
            description_en: opts.input.description_en || ""
        }
    });
    return word;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insertWord);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2075:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$y": () => (/* binding */ publicProcedure),
/* harmony export */   "Nd": () => (/* binding */ router),
/* harmony export */   "U5": () => (/* binding */ protectedProcedure),
/* harmony export */   "qF": () => (/* binding */ adminProcedure)
/* harmony export */ });
/* unused harmony exports middleware, ownerProcedure */
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2937);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc_server__WEBPACK_IMPORTED_MODULE_0__]);
_trpc_server__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const t = _trpc_server__WEBPACK_IMPORTED_MODULE_0__.initTRPC.context().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */ const router = t.router;
const middleware = t.middleware;
const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use((opts)=>{
    // @ts-ignore
    if (!opts.ctx.user) throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
        code: "UNAUTHORIZED"
    });
    return opts.next();
});
const adminProcedure = protectedProcedure.use((opts)=>{
    // @ts-ignore
    if (![
        "admin",
        "owner"
    ].includes(opts.ctx.user?.role)) {
        throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
            code: "UNAUTHORIZED"
        });
    }
    return opts.next();
});
const ownerProcedure = protectedProcedure.use((opts)=>{
    // @ts-ignore
    if (!opts.ctx.user?.role !== "owner") throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
        code: "UNAUTHORIZED"
    });
    return opts.next();
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [260], () => (__webpack_exec__(2444)));
module.exports = __webpack_exports__;

})();