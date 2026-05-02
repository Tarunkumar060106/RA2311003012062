const Log = require("./logger");

function requestLogger(req, res, next) {
    const start = Date.now();

    res.on("finish", () => {
        const time = Date.now() - start;
        Log("backend", "info", "controller", `${req.method} ${req.originalUrl} - ${res.statusCode} - ${time}ms`);
    });

    next();
}

module.exports = requestLogger;