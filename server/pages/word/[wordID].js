"use strict";
(() => {
var exports = {};
exports.id = 597;
exports.ids = [597];
exports.modules = {

/***/ 3948:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WordPage),
/* harmony export */   "getQueryItem": () => (/* binding */ getQueryItem),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2086);
/* harmony import */ var _ui_PageContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8708);
/* harmony import */ var _ui_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9041);
/* harmony import */ var _utils_trpc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(908);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ui_ClipComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3699);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ui_header__WEBPACK_IMPORTED_MODULE_2__, _utils_trpc__WEBPACK_IMPORTED_MODULE_3__, _ui_ClipComponent__WEBPACK_IMPORTED_MODULE_5__]);
([_ui_header__WEBPACK_IMPORTED_MODULE_2__, _utils_trpc__WEBPACK_IMPORTED_MODULE_3__, _ui_ClipComponent__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function getQueryItem(query) {
    if (typeof query === "string") return query;
    if (query.length > 0) return query[0];
}
const getServerSideProps = async (ctx)=>{
    // const helpers = createServerSideHelpers({
    //     router: appRouter,
    //     ctx: {},
    // });
    // @ts-ignore
    // await helpers.word.getWord.prefetch(ctx.query.wordID);
    return {
        props: {
            // trpcState: helpers.dehydrate(),
            wordID: ctx.query.wordID
        }
    };
};
function WordPage({ trpcState , wordID  }) {
    const word = _utils_trpc__WEBPACK_IMPORTED_MODULE_3__/* .trpc.word.getWord.useQuery */ .d.word.getWord.useQuery(wordID);
    if (word.status != "success") {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_header__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    isSearch: true
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_PageContainer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                    children: "Loading"
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_header__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                isSearch: true
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_PageContainer__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        word?.data?.ar,
                        word?.data && word?.data?.clips.map((e, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_ClipComponent__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                ar: word.data?.ar || "",
                                clipId: e.id,
                                number: i,
                                username: e.userId || ""
                            }, i))
                    ]
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9629:
/***/ ((module) => {

module.exports = require("@blueprintjs/core");

/***/ }),

/***/ 5993:
/***/ ((module) => {

module.exports = require("@wmik/use-media-recorder");

/***/ }),

/***/ 1996:
/***/ ((module) => {

module.exports = require("axios-hooks");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 9755:
/***/ ((module) => {

module.exports = require("react-use");

/***/ }),

/***/ 9752:
/***/ ((module) => {

module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ 272:
/***/ ((module) => {

module.exports = import("@trpc/client");;

/***/ }),

/***/ 9740:
/***/ ((module) => {

module.exports = import("@trpc/react-query");;

/***/ }),

/***/ 8794:
/***/ ((module) => {

module.exports = import("@trpc/react-query/shared");;

/***/ }),

/***/ 3558:
/***/ ((module) => {

module.exports = import("@trpc/server/shared");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [86,88,878,908,408,699], () => (__webpack_exec__(3948)));
module.exports = __webpack_exports__;

})();