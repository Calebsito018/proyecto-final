import mongoose from "mongoose";
import config from "./config.js";
import loguer from "../winston.js";

const URI = config.mongo_uri;

mongoose.connect(URI)
.then(() => loguer.debug("Connected to Database"))
.catch(error => loguer.error(error))