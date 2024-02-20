exports.handleCustomErrors = ((err, req, res, next) => {
    if(err.status) {
        res.status(err.status).send({msg: err.msg})
    }
    else {
        next(err);
    }
})

exports.handlePsqlErrors = ((err, req, res, next) => {
    console.log(err.code)
    const errorCodes400 = ['22P02'];
    if (errorCodes400.includes(err.code)) {
        res.status(400).send({msg: 'Bad request'});
    }
    else {
        next(err)
    }
})

exports.handleServerErrors = ((err, req, res, next) => {
    res.status(500).send({msg: 'Internal server error!'})
})