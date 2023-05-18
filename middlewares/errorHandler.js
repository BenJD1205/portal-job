/*Not found error handler*/
const notFound = (req, res, next) => {
    const error = new Error(`Route notfound: ${req.originalUrl}`);
    next(error);
};

const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};

/* Error handler*/
const handleError = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        status: false,
        message: err?.message,
        stack: err?.stack,
    });
};

module.exports = { handleError, notFound, createError };
