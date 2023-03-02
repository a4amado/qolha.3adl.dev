import Express, { Request, Response, Errback } from "express";
import ClipsRouter from "./routes/clips.route";
import UserRouter from "./routes/users.route";
import WordRouter from "./routes/words.route";
import AuthRoute from "./routes/auth.route";
import cors from "cors";
import bodyParser from "body-parser";
import CookieParser from "cookie-parser";

const app = Express();

import HitsRoute from "./routes/q.route";

app.use(
    cors({
        origin: ["qolha.3adl.dev", "localhost:5000"],
        methods: ["POST", "GET"],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(CookieParser());

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

app.use("/clips", ClipsRouter);

app.use("/words", WordRouter);
app.use("/users", UserRouter);
app.use("/auth", AuthRoute);
app.use("/hits", HitsRoute);
import { StatusCodes, ReasonPhrases } from "http-status-codes";
app.use((err: any, req: Request, res: Response) => {
    res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).send(err.msg || JSON.stringify(err) || ReasonPhrases.INTERNAL_SERVER_ERROR);
});

app.listen(4000, () => {
    console.log("Server is Up");
});
