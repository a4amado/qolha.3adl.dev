import { serve } from "micro"
import app from "../../../backend/server";



export default serve(app);