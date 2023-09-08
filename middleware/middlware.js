const middleWare = (err, req, res, next) => {

    err.message = err.message || 'Internal server Error.';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).send({ error: true, message: err.message })
}

module.exports = middleWare;