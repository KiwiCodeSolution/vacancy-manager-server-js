const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), {
    flags: "a",
});

const requestLogger = morgan(
    (tokens, req, res) => {
        const date = moment().tz("Europe/Kiev").format("YYYY-MM-DD HH:mm:ss");
        const method = tokens.method(req, res);
        const url = tokens.url(req, res);
        const status = tokens.status(req, res);
        const responseTime = tokens["response-time"](req, res);
        const contentLength = tokens.res(req, res, "content-length");
        const remoteAddr = tokens["remote-addr"](req, res);
        const userAgent = tokens["user-agent"](req, res);

        return `${date} ${remoteAddr} ${method} ${url} ${status} ${contentLength} - ${responseTime} ms ${userAgent}`;
    },
    { stream: accessLogStream }
);

module.exports = requestLogger;
