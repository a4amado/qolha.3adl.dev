import Express from "express";
import ClipsRouter from "./routes/clips.route";
import RateRouter from "./routes/rates.route";
import UserRouter from "./routes/users.route";
import WordRouter from "./routes/words.route";
import AuthRoute from "./routes/auth.route"
import cors from "cors"
const app = Express();
import bodyParser from "body-parser";
import CookieParser from "cookie-parser";

import HitsRoute from "./routes/q.route"


app.use(cors({
    origin: ["qolha.3adl.dev", "localhost:3000"],
    methods: ["POST", "GET"]
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(CookieParser());

app.use("/clips", ClipsRouter);
app.use("/rates", RateRouter);
app.use("/words", WordRouter);
app.use("/users", UserRouter);
app.use("/auth", AuthRoute)
app.use("/hits", HitsRoute)





app.listen(3000, () => {
    console.log("Server is Up");

})











