"use strict";
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 908:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "d": () => (/* binding */ trpc)
/* harmony export */ });
/* unused harmony export getBaseUrl */
/* harmony import */ var _trpc_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(272);
/* harmony import */ var _trpc_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4088);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_trpc_client__WEBPACK_IMPORTED_MODULE_0__, _trpc_next__WEBPACK_IMPORTED_MODULE_1__]);
([_trpc_client__WEBPACK_IMPORTED_MODULE_0__, _trpc_next__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


function getBaseUrl() {
    if (false) // browser should use relative path
    {}
    if (process.env.VERCEL_URL) // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
    if (process.env.RENDER_INTERNAL_HOSTNAME) // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}
const trpc = (0,_trpc_next__WEBPACK_IMPORTED_MODULE_1__/* .createTRPCNext */ .t)({
    config (opts) {
        return {
            links: [
                (0,_trpc_client__WEBPACK_IMPORTED_MODULE_0__.httpBatchLink)({
                    url: `${getBaseUrl()}/api/trpc`,
                    async headers () {
                        return {
                        };
                    }
                })
            ]
        };
    },
    ssr: false
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;