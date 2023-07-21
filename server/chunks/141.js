"use strict";
exports.id = 141;
exports.ids = [141];
exports.modules = {

/***/ 6703:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ PageContainer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2086);

function PageContainer(props) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "block mx-auto w-full max-w-4xl px-4 py-2",
        children: props.children
    });
}


/***/ }),

/***/ 9284:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ContributeClip)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2086);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9629);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_recorder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(712);
/* harmony import */ var _utils_trpc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4722);
/* harmony import */ var axios_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4088);
/* harmony import */ var axios_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_trpc__WEBPACK_IMPORTED_MODULE_3__]);
_utils_trpc__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function ContributeClip() {
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
    const [blob, setBlob] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
    const [link, setLink] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
    const word = _utils_trpc__WEBPACK_IMPORTED_MODULE_3__/* .trpc */ .d.word.getWordThatNeedsClips.useQuery();
    const [clip, axiosSubmitClip] = axios_hooks__WEBPACK_IMPORTED_MODULE_4___default()({
        method: "POST",
        withCredentials: true,
        url: `/api/clip/insert?wordId=${word?.data && word?.data?.id}`,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }, {
        manual: true
    });
    const deleted_word = _utils_trpc__WEBPACK_IMPORTED_MODULE_3__/* .trpc */ .d.word.deleteWord.useMutation();
    function handleFinishRecord(recordBlob, link) {
        setBlob(recordBlob);
        setLink(link);
    }
    async function submitClip() {
        if (blob?.size === 0 || !blob) return;
        const f = new FormData();
        f.append("clip", blob);
        await axiosSubmitClip({
            data: f
        });
        setBlob(null);
        setLink(null);
        word.refetch();
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                title: "open",
                text: "open",
                onClick: ()=>setOpen(true)
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Dialog, {
                isOpen: open,
                title: "Contribute a Clip",
                icon: "info-sign",
                isCloseButtonShown: true,
                onClose: ()=>setOpen(false),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.DialogBody, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col max-w-xs border p-2 mx-auto",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Callout, {
                                        icon: "new-text-box",
                                        intent: "primary",
                                        title: word.data?.ar
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ui_recorder__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                        disabled: !word.data?.ar,
                                        onFinish: handleFinishRecord
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
                                        nonce: "",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                className: "w-1/2",
                                                intent: "primary",
                                                icon: "send-to",
                                                title: "send",
                                                text: "send",
                                                onClick: async ()=>{
                                                    await submitClip();
                                                    word.refetch();
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {}),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                className: "w-1/2",
                                                intent: "danger",
                                                icon: "delete",
                                                title: "delete",
                                                text: "delete",
                                                onClick: async ()=>{
                                                    if (!word?.data?.id) return;
                                                    await deleted_word.mutateAsync({
                                                        wordId: word?.data?.id
                                                    });
                                                    word.refetch();
                                                }
                                            })
                                        ]
                                    })
                                ]
                            }),
                            " "
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.DialogFooter, {
                        actions: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                            onClick: ()=>setOpen(false),
                            intent: "primary",
                            text: "Close"
                        })
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7890:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2086);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9629);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5744);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _contribute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9284);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_contribute__WEBPACK_IMPORTED_MODULE_6__]);
_contribute__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







function Header({ isSearch }) {
    const session = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.Navbar, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.Navbar.Group, {
            align: _blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.Alignment.LEFT,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.Navbar.Heading, {
                    children: "Qolha"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.Navbar.Divider, {}),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                    href: "/",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.Button, {
                        className: "bp5-minimal",
                        icon: "home",
                        text: "Home"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                    href: "/word/add",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.Button, {
                        className: "bp5-minimal",
                        icon: "add-column-right",
                        text: "add word"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_contribute__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {})
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Recorder)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2086);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9629);
/* harmony import */ var _blueprintjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wmik_use_media_recorder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5993);
/* harmony import */ var _wmik_use_media_recorder__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wmik_use_media_recorder__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




function Recorder({ onFinish, disabled }) {
    const link = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const rec = _wmik_use_media_recorder__WEBPACK_IMPORTED_MODULE_2___default()({
        recordScreen: false,
        mediaStreamConstraints: {
            audio: true,
            video: false
        },
        onStop: (b)=>{
            const url = URL.createObjectURL(b);
            link[1](url);
            onFinish(b, url);
        }
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                role: "alert"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
                className: "w-full flex justify-around",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        className: "w-1/2",
                        icon: [
                            "recording",
                            "paused"
                        ].includes(rec.status) ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "relative flex h-3 w-3",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "relative inline-flex rounded-full h-3 w-3 bg-red-500"
                                })
                            ]
                        }) : "record",
                        disabled: disabled,
                        onClick: ()=>[
                                "recording",
                                "paused"
                            ].includes(rec.status) ? rec.stopRecording() : rec.startRecording(),
                        title: [
                            "recording",
                            "paused"
                        ].includes(rec.status) ? "Record" : "Stop_",
                        text: [
                            "recording",
                            "paused"
                        ].includes(rec.status) ? "Stop_" : "Record"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        className: "w-1/2",
                        disabled: disabled,
                        onClick: ()=>rec.status === "paused" ? rec.resumeRecording() : rec.pauseRecording(),
                        title: rec.status === "paused" ? "Resume" : "Pause ",
                        text: rec.status === "paused" ? "Resume" : "Pause "
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                role: "alert"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Callout, {
                intent: "primary",
                icon: "record",
                className: "text-center",
                title: rec.status
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                role: "alert"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("audio", {
                src: link[0],
                controls: true
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_1__.Divider, {
                role: "alert"
            })
        ]
    });
}


/***/ })

};
;