const basicAuth = require('express-basic-auth')
const getUsersAuth = require('../../helpers/getUsersAuth')
const Problem = require('api-problem')

/**
 * 
 * @param {String[]} roles 
 */
const basicAuthMiddleware = (roles) => {
    return [async (req, res, next) => {
        const users = await getUsersAuth()

        const authorizer = (userId, userPassword) => {
            const user = users.find(({ id, password }) => basicAuth.safeCompare(id, userId) && basicAuth.safeCompare(password, userPassword))

            return !!user && roles.includes(user.role)
        }

        const unauthorizedResponse = ({ originalUrl: instance, auth: { user: userId, password } = {} }) => {
            throw new Problem(401, null, null, {
                detail: userId ? 'invalid credentials ' : 'no credential provided',
                instance
            })
        }

        basicAuth({ authorizer, unauthorizedResponse })(req, res, next)
    }
    ]

}

module.exports = {
    basicAuthMiddleware
}