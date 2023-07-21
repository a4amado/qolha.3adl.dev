"use strict";
exports.id = 699;
exports.ids = [699];
exports.modules = {

/***/ 4544:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ClipComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2086);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9629);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(908);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9755);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_use__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_trpc__WEBPACK_IMPORTED_MODULE_2__]);
_utils_trpc__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function ClipComponent({ number , ar , username , clipId  }) {
    const rej = _utils_trpc__WEBPACK_IMPORTED_MODULE_2__/* .trpc.clip.reject.useMutation */ .d.clip.reject.useMutation();
    const acc = _utils_trpc__WEBPACK_IMPORTED_MODULE_2__/* .trpc.clip.accept.useMutation */ .d.clip.accept.useMutation();
    const disabled = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const session = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_3__.useSession)();
    const audio = (0,react_use__WEBPACK_IMPORTED_MODULE_5__.useAudio)({
        src: `/api/clip/${clipId}/stream`
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `flex p-1 justify-between ${number % 2 === 0 ? "bg-slate-200" : ""}`,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                children: ar
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                children: username
            }),
            audio[0],
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
                className: "gap-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        disabled: disabled[0],
                        onClick: audio[2].play,
                        small: true,
                        icon: "play",
                        text: "play"
                    }),
                    session.status === "authenticated" && [
                        "owner",
                        "admin"
                    ].includes(session.data?.user?.role || "") && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        disabled: disabled[0],
                        onClick: async ()=>{
                            await acc.mutateAsync({
                                clipId: clipId
                            });
                            disabled[1](true);
                        },
                        small: true,
                        intent: "primary",
                        text: "accept"
                    }),
                    session.status === "authenticated" && [
                        "owner",
                        "admin"
                    ].includes(session.data?.user?.role || "") && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        disabled: disabled[0],
                        onClick: async ()=>{
                            await rej.mutateAsync({
                                clipId: clipId
                            });
                            disabled[1](true);
                        },
                        small: true,
                        intent: "danger",
                        icon: "trash",
                        text: "reject"
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3699:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ClipComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4544);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ClipComponent__WEBPACK_IMPORTED_MODULE_0__]);
_ClipComponent__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_ClipComponent__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;