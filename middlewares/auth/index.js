const { jwtAuthMiddleware } = require('./jwt')
const { basicAuthMiddleware } = require('./basic')

const { AUTH_TYPE = 'none' } = process.env

const authMiddlewares = {
    jwt: jwtAuthMiddleware,
    basic: basicAuthMiddleware
}


/**
 * 
 * @param {String[]} roles  
 */

const authMiddleware = (roles) => {
    const selectedAuthMiddleware = authMiddlewares[AUTH_TYPE]

    if (!selectedAuthMiddleware) {
        return [(req, res, next) => next()]
    }

    return selectedAuthMiddleware(roles)
}

module.exports = authMiddleware