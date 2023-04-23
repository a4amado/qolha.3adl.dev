import Express from "express";
import routes from "./routes";

const app = Express();

app.use("/api", routes);

export default app;
