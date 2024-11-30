const responses = require('./responses')

function errors(err, req, res, next) {
    console.log('error')
    const message = err.message || 'Server error'
    const status = err.status || 500
    responses.error(req, res, message, status)
}

module.exports = errors