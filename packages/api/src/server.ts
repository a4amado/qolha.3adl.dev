import Express, { Request, Response, Errback } from "express";
import ClipsRouter from "./routes/clips.route";
import UserRouter from "./routes/users.route";
import WordRouter from "./routes/words.route";
import AuthRoute from "./routes/auth.route";
import cors from "cors";
import bodyParser from "body-parser";
import CookieParser from "cookie-parser";
// @ts-ignore
import responde from "express-respond";
const app = Express();

import HitsRoute from "./routes/q.route";

app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET", "DELETE"],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(CookieParser());
app.use(responde);


app.use("/clips", ClipsRouter);

app.use("/words", WordRouter);
app.use("/users", UserRouter);
app.use("/auth", AuthRoute);
app.use("/hits", HitsRoute);
import { StatusCodes, ReasonPhrases } from "http-status-codes";

app.use((req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});

app.listen(4000, () => {
    console.log("Server is Up");
});
