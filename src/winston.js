import winston from "winston";
import config from "./config/config.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        debug: 'blue',
        http: 'yellow',
        info: 'green',
        warn: 'orange',
        error: 'red',
        fatal: 'magenta'
    }
}
const developmentLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevels.colors}),
                winston.format.simple()
            )
        })
    ]
})

const productionLoguer = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevels.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "errors.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.prettyPrint()
            )
        })
    ]
})

const loguer = config.node_env === "production" ? productionLoguer : developmentLogger

export default loguer