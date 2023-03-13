import Express, { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import CookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

const app = Express();







app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET", "DELETE"],
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(CookieParser());


app.use(routes)

app.use((req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});


app.listen(process.env.PORT || 4000, () => {
    console.log("Server is Up");
});

export default app;