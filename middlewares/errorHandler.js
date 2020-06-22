const Middleware = require('api-problem/lib/middleware')
const Problem = require('api-problem')

const {
    ERROR_NO_POLICIES,
    ERROR_NO_POLICY,
    ERROR_NO_USERS,
    ERROR_NO_USER,
} = require('../config/const')

const errorToHttp = (e, req) => {
    const { message, name, code } = e
    const { originalUrl: instance } = req

    // https://www.npmjs.com/package/express-jwt-permissions#error-handling
    if (code === 'permission_denied') {
        return new Problem(403, null, null, {
            detail: message,
            instance
        })
    }

    // https://www.npmjs.com/package/express-jwt#error-handling
    if (name === 'UnauthorizedError') {
        return new Problem(401, null, null, {
            detail: message,
            instance
        })
    }

    switch (message) {
        case ERROR_NO_POLICIES:
        case ERROR_NO_POLICY:
        case ERROR_NO_USERS:
        case ERROR_NO_USER:
            return new Problem(404, null, null, {
                detail: message,
                instance
            })
        default:
            return new Problem(500, null, null, {
                detail: message,
                instance
            })
    }
}

module.exports = (error, req, res, next) => {
    const apiProblem = error instanceof Problem ? error : errorToHttp(error, req)

    Middleware()(apiProblem, req, res, next)
}