const axios = require('../config/axios')
const logger = require('../config/logger')
const {
    ERROR_NO_USER,
    ERROR_NO_USERS,
    ERROR_FETCH_USERS,
    ERROR_FETCH_USERS_RESPONSE_NO_RECEIVED,
    ERROR_FETCH_USERS_RESPONSE_RECEIVED
} = require('../config/const')

/**
 * User struct
 * @typedef {Object} User
 * @property {String} id - Unique id (UUID v4).
 * @property {String} name 
 * @property {'admin'|'user'} role 
 * @property {string} email 
 */

/**
 * @returns {Promise<User[]>}
 */
const _fetchUsers = async ()  =>{
    const { data: { clients: users } } = await axios.get('/5808862710000087232b75ac')

    return users
}

/**
 * @returns {Promise<User[]>}
 */
const getUsers = async () => {
    let _users

    try {
        _users = await _fetchUsers()
    } catch (e) {
        throw new Error(ERROR_NO_USERS)
    }

    return _users
}

/**
 * 
 * @param {'id'|'name'|'email'|'role'} fieldToCheck 
 * @param {String} value 
 * 
 * @returns {Promise<User>}
 */
const _findUserBy = async (fieldToCheck, value) => {
    const users = await getUsers()

    const valueLowerCase = value.toLowerCase()

    const user = users.find(({[fieldToCheck]: field}) => field.toLowerCase() === valueLowerCase)

    if (!user)
        throw new Error(ERROR_NO_USER)

    return user
}
/*

_fetchUsers()
    .then((users) => {
        _users = users
        logger.info('users loaded')
        logger.debug(JSON.stringify(_users))
    })
    .catch((e) => {
        logger.crit(ERROR_FETCH_USERS)

        if (!e.isAxiosError) {
            logger.crit(e)
            return
        }

        const { response, request } = e

        if (!response) {
            logger.crit(ERROR_FETCH_USERS_RESPONSE_NO_RECEIVED)
            logger.crit(JSON.stringify(request))
            return
        }

        const { data, status, headers } = response

        logger.crit(ERROR_FETCH_USERS_RESPONSE_RECEIVED)

        logger.crit('Status:')
        logger.crit(status)

        logger.crit('Data:')
        logger.crit(JSON.stringify(data))

        logger.crit('Headers:')
        logger.crit(JSON.stringify(headers))
    })
*/
module.exports = {
    getUsersByName: async (name) => await _findUserBy('name', name),
    getUsersById: async (id) => await _findUserBy('id', id),
    getUsers
}
