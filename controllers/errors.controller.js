exports.handleCustomErrors = ((err, req, res, next) => {
    if(err.status) {
        res.status(err.status).send({status: err.status, msg: err.msg})
    }
    else {
        next(err);
    }
})

exports.handlePsqlErrors = ((err, req, res, next) => {
    const errorCodes400 = ['22P02', '23502', '23503'];
    if (errorCodes400.includes(err.code)) {
        res.status(400).send({err: 400, msg: 'Bad request'});
    }
    else {
        next(err);
    }
})

exports.handleServerErrors = ((err, req, res, next) => {
    res.status(500).send({msg: 'Internal server error!'})
})