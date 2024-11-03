import pino from "pino";
import pretty from "pino-pretty";
import dotenv from "dotenv";

dotenv.config();

const stream = pretty({
    levelFirst: true,
    colorize: true,
    ignore: "time,hostname,pid",
});

export default pino(
    {
        name: "YY-Logger",
        level: process.env.PROFILE === 'dev' ? "debug" : "info",
    },
    stream
);