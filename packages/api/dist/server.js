"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clips_route_1 = __importDefault(require("./routes/clips.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const words_route_1 = __importDefault(require("./routes/words.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// @ts-ignore
const express_respond_1 = __importDefault(require("express-respond"));
const app = (0, express_1.default)();
const q_route_1 = __importDefault(require("./routes/q.route"));
app.use((0, cors_1.default)({
    origin: ["qolha.3adl.dev", "localhost:5000"],
    methods: ["POST", "GET"],
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_respond_1.default);
/**
 * /words/:wordID /GET
 * /words/:wordID/clips /GET
 * /words/:wordID/clip /POST
 * /words/:wordID/
 *
 * /clips/:clipID/accept|reject /POST
 * /clips/toBeREviewed
 * /clips/:clipID
 *
 *
 *
 */
app.use("/clips", clips_route_1.default);
app.use("/words", words_route_1.default);
app.use("/users", users_route_1.default);
app.use("/auth", auth_route_1.default);
app.use("/hits", q_route_1.default);
const http_status_codes_1 = require("http-status-codes");
app.use((err, req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(http_status_codes_1.ReasonPhrases.NOT_FOUND);
});
app.listen(4000, () => {
    console.log("Server is Up");
});
