import {serve} from "micro"
import routes from "../../../backend/routes"
import express from "express";
 const app = express()
 
app.use("/api", routes);


export default serve(app)
