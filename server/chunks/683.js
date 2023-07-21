"use strict";
exports.id = 683;
exports.ids = [683];
exports.modules = {

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

/***/ 8683:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authOptions: () => (/* binding */ authOptions),
/* harmony export */   "default": () => (/* binding */ auth)
/* harmony export */ });
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1116);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3227);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3598);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var request_ip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2316);
/* harmony import */ var request_ip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(request_ip__WEBPACK_IMPORTED_MODULE_3__);




const authOptions = (req, res)=>{
    const ip = request_ip__WEBPACK_IMPORTED_MODULE_3___default().getClientIp(req);
    return {
        providers: [
            next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2___default()({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET
            })
        ],
        callbacks: {
            async jwt ({ token, user, account, profile }) {
                if (user) {
                    return {
                        ...token,
                        // @ts-ignore
                        role: user?.role
                    };
                }
                return token;
            },
            async session ({ session, token, user }) {
                // @ts-ignore
                session.user.role = token?.role || user?.role;
                return session;
            },
            signIn (params) {
                // @ts-ignore
                if (params.user.banned) return "You-are-banned";
                return true;
            }
        },
        adapter: _db__WEBPACK_IMPORTED_MODULE_0__/* .AuthPrisma */ .T,
        session: {
            strategy: "database",
            maxAge: 1000 * 60 * 60
        },
        debug: true,
        secret: process.env.NEXTAUTH_SECRET,
        theme: {
            colorScheme: "auto"
        },
        events: {
            async createUser (message) {
                await _db__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.user.update({
                    data: {
                        country: ip || ""
                    },
                    where: {
                        email: message.user.email || ""
                    }
                });
            }
        }
    };
};
async function auth(req, res) {
    return await next_auth__WEBPACK_IMPORTED_MODULE_1___default()(req, res, authOptions(req, res));
}


/***/ })

};
;