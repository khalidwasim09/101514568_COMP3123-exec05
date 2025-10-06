const errorHandlerMiddleware = (err, req, res, next) => {
    //console.error(err.stack);
    const errorObj = { 
        status: 500,
        message:'Something broke!',
        err: err.message
    };
    res.status(500).send(errorObj);
}

module.exports = errorHandlerMiddleware;