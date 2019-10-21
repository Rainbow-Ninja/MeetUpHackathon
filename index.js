// require("dotenv").config();
require("../database/connect");
const app = require('./app');
const port = 3000;

global.HTTPError = class HTTPError extends Error {
    constructor(statusCode, message) {
        super(message);
  
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HTTPError);
        }
        this.name = "HTTPError";
        this.statusCode = statusCode;
    }
};

app.listen(port, () => console.log(`Listening on port ${port}`));