"use strict";
(() => {
var exports = {};
exports.id = 237;
exports.ids = [237];
exports.modules = {

/***/ 5509:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ss)
});

;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: external "process"
const external_process_namespaceObject = require("process");
;// CONCATENATED MODULE: external "@next-auth/prisma-adapter"
const prisma_adapter_namespaceObject = require("@next-auth/prisma-adapter");
;// CONCATENATED MODULE: ./backend/db/index.ts



const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new client_namespaceObject.PrismaClient({
    log: external_process_namespaceObject.env.NODE_ENV === "development" ? [
        "query",
        "error",
        "warn"
    ] : [
        "error"
    ]
});
if (external_process_namespaceObject.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
const AuthPrisma = (0,prisma_adapter_namespaceObject.PrismaAdapter)(prisma);
/* harmony default export */ const db = (prisma);


;// CONCATENATED MODULE: ./src/pages/api/index.ts

async function ss(req, res) {
    res.json(await db.user.findUnique({
        where: {
            email: "a4addel@gmail.com"
        }
    }));
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5509));
module.exports = __webpack_exports__;

})();