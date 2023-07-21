(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9632:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2086);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7517);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _blueprintjs_core_lib_css_blueprint_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122);
/* harmony import */ var _blueprintjs_core_lib_css_blueprint_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blueprintjs_core_lib_css_blueprint_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _blueprintjs_icons_lib_css_blueprint_icons_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9074);
/* harmony import */ var _blueprintjs_icons_lib_css_blueprint_icons_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_blueprintjs_icons_lib_css_blueprint_icons_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui_GoToUp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6768);
/* harmony import */ var _ui_Loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7129);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9648);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _utils_trpc__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(908);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_8__, _utils_trpc__WEBPACK_IMPORTED_MODULE_10__]);
([axios__WEBPACK_IMPORTED_MODULE_8__, _utils_trpc__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











next_router__WEBPACK_IMPORTED_MODULE_7___default().events.on("routeChangeStart", ()=>{
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer?.classList.remove("out-loading");
    loadingContainer?.classList.remove("hide-loading");
    loadingContainer?.classList.add("active-loading");
});
next_router__WEBPACK_IMPORTED_MODULE_7___default().events.on("routeChangeComplete", ()=>{
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer?.classList.add("out-loading");
    setTimeout(()=>{
        loadingContainer?.classList.add("hide-loading");
    }, 500);
});
const MyApp = ({ Component , pageProps: { session , ...pageProps }  })=>{
    react__WEBPACK_IMPORTED_MODULE_6___default().useEffect(()=>{
        function handleSuccess(response) {
            return response;
        }
        function handleError(error) {
            // @ts-ignore
            error.response?.data.message.map((e)=>{
            // showNotification({
            //     message: e,
            //     type: "error",
            //     destroyAfter: 1500,
            // });
            });
            return Promise.reject(error);
        }
        const id = axios__WEBPACK_IMPORTED_MODULE_8__["default"].interceptors.response.use(handleSuccess, handleError);
        return ()=>axios__WEBPACK_IMPORTED_MODULE_8__["default"].interceptors.response.eject(id);
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react__WEBPACK_IMPORTED_MODULE_6__.Suspense, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_auth_react__WEBPACK_IMPORTED_MODULE_9__.SessionProvider, {
            session: session,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_Loading__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_GoToUp__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {})
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_utils_trpc__WEBPACK_IMPORTED_MODULE_10__/* .trpc.withTRPC */ .d.withTRPC(MyApp));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6768:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ GoToUp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2086);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9629);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



function GoToUp() {
    function gotToUp() {
        window.scrollTo({
            top: 0,
            left: 0
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
        onClick: gotToUp,
        className: "fixed right-2 bottom-2 bg-white ",
        icon: "arrow-up"
    });
}


/***/ }),

/***/ 122:
/***/ (() => {



/***/ }),

/***/ 9074:
/***/ (() => {



/***/ }),

/***/ 7517:
/***/ (() => {



/***/ }),

/***/ 9629:
/***/ ((module) => {

"use strict";
module.exports = require("@blueprintjs/core");

/***/ }),

/***/ 1649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 9752:
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ 272:
/***/ ((module) => {

"use strict";
module.exports = import("@trpc/client");;

/***/ }),

/***/ 9740:
/***/ ((module) => {

"use strict";
module.exports = import("@trpc/react-query");;

/***/ }),

/***/ 8794:
/***/ ((module) => {

"use strict";
module.exports = import("@trpc/react-query/shared");;

/***/ }),

/***/ 3558:
/***/ ((module) => {

"use strict";
module.exports = import("@trpc/server/shared");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [86,88,908,129], () => (__webpack_exec__(9632)));
module.exports = __webpack_exports__;

})();