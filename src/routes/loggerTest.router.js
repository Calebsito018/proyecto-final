import { Router } from "express";
import loguer from "../winston.js";

const router = Router()

router.get("/", (req, res) => {
    loguer.debug('Debug message');
    loguer.http('HTTP message');
    loguer.info('Info message');
    loguer.warning('Warning message');
    loguer.error('Error message');
    loguer.fatal('Fatal message');
    res.send('Logs registrados en la consola o en el archivo "errors.log" segun el nivel');
});

export default router