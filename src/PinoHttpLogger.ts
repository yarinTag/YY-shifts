import pino_http from "pino-http";
import {randomUUID} from "node:crypto";
import PinoLogger from "./PinoLogger";

export default pino_http({
    // Reuse an existing logger instance
    logger: PinoLogger,

    // Define a custom request id function
    genReqId: function (req, res) {
        const existingID = req.id ?? req.headers["x-request-id"]
        if (existingID) return existingID
        const id = randomUUID()
        res.setHeader('X-Request-Id', id)
        return id
    },

    // Define custom serializers
    // serializers: {
    //     err: pino.stdSerializers.err,
    //     req: pino.stdSerializers.req,
    //     res: pino.stdSerializers.res
    // },

    // Set to `false` to prevent standard serializers from being wrapped.
    wrapSerializers: true,

    // Logger level is `info` by default
    // useLevel: 'info',

    // Define a custom logger level
    customLogLevel: function (req, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn'
        } else if (res.statusCode >= 500 || err) {
            return 'error'
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent'
        }
        return 'info'
    },

    // Define a custom success message
    customSuccessMessage: function (req, res) {
        if (res.statusCode === 404) {
            return 'resource not found'
        }
        return `${req.method} completed`
    },

    // Define a custom receive message
    customReceivedMessage: function (req, res) {
        return 'request received: ' + req.method
    },

    // Define a custom error message
    customErrorMessage: function (req, res, err) {
        return 'request errored with status code: ' + res.statusCode
    },

    // Override attribute keys for the log object
    customAttributeKeys: {
        req: 'request',
        res: 'response',
        err: 'error',
        responseTime: 'timeTaken'
    },

    // Define additional custom request properties
    // customProps: function (req, res) {
    //     return {
    //         customProp: req.customProp,
    //         // user request-scoped data is in res.locals for express applications
    //         customProp2: res.locals.myCustomData
    //     }
    // }
})