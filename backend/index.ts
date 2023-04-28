
import { Router } from "express"
import AuthRoutes from "./routes/auth.routes"
const routes  = Router();

import ClipsRoutes from "./routes/clips.routes"
import UsersRoutes from "./routes/users.routes"
import WordsRoutes from "./routes/words.routes"
import { queryHits } from "./controllers/q.controller";
import catchError from "./utils/catchError";



routes.all("/auth", AuthRoutes)
routes.all("/clips", ClipsRoutes)
routes.all("/users", UsersRoutes)
routes.all("/words", WordsRoutes)
routes.get("/q/:q", catchError(queryHits));

export default routes;
