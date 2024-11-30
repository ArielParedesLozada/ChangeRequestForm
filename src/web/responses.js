exports.success = function (req, res, message, status) {
    const statusCode = status || 200
    const messageDef = message || ''
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: messageDef
    })
}

exports.error = function (req, res, message, status) {
    const statusCode = status || 500
    const messageDef = message || 'Server error'
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: messageDef
    })
}