const jwt = require('jsonwebtoken')
const { generateKeyPairSync } = require('crypto')
const moment = require('moment')
const uuid = require('uuid')
const Problem = require('api-problem')
const jwtExpress = require('express-jwt')
const jwtPermissionsExpress = require('express-jwt-permissions')
const getUsersAuth = require('../../helpers/getUsersAuth')

const { publicKey, privateKey} = generateKeyPairSync('rsa', 
{   
    modulusLength: 2048,  // the length of your key in bits   
    publicKeyEncoding: {
      type: 'spki',       // recommended to be 'spki' by the Node.js docs
      format: 'pem'   
    },   
    privateKeyEncoding: {
      type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
      format: 'pem', 
  } 
}
)


const { AUTH_JWT_ACCESS_EXPIRATION = 3600,  AUTH_JWT_REFRESH_EXPIRATION = 7200 } = process.env

/**
 * @typedef Tokens
 * 
 * @property {String} accessToken
 * @property {String} refreshToken
 */

const login = async (req, res, next) => {
    const { body: { id: userId, password: userPassword }, originalUrl: instance } = req
    
    let users = await getUsersAuth()

    const user = users.find(({id, password}) => id === userId && password === userPassword)
    
    if (!user) {
        throw new Problem(401, null, null, {
            detail: 'invalid credentials',
            instance
        })
    }

    const scope = user.role

    const accessPayload = { scope }

    const refreshPayload = { uuid: uuid.v4() }

    const jwtOptions = {
        algorithm: 'RS256',
        subject: user.id,
        audience: 'all',
    }

    const accessToken = jwt.sign(accessPayload, privateKey, { expiresIn: AUTH_JWT_ACCESS_EXPIRATION, ...jwtOptions })
    const refreshToken = jwt.sign(refreshPayload, privateKey, { expiresIn: AUTH_JWT_REFRESH_EXPIRATION, jwtid: refreshPayload.uuid, ...jwtOptions })

    return { tokenType: 'Bearer', expiresIn: AUTH_JWT_ACCESS_EXPIRATION, accessToken, refreshToken }
}

const jwtMiddleware = jwtExpress({secret: publicKey })
const jwtPermissionsMiddleware = jwtPermissionsExpress({ permissionsProperty: 'scope'})

/**
 * 
 * @param {String[]} roles 
 */
const jwtAuthMiddleware = (roles) => {
    const rolesToCheck = roles.map((role) => [role])
    return [ jwtMiddleware, jwtPermissionsMiddleware.check(rolesToCheck) ]
}

//TODO: refresh Token

module.exports = {
    jwtAuthMiddleware,
    login
}