const Problem = require('api-problem')
const { getUsers } = require('../services/users') 

const {
    AUTH_DUMMY_PASSWORD = 'dummyPassword'
} = process.env

/**
 * @returns {Promise<import('../services/users').User[]>}
 */
module.exports = async () => {
    let users
    
    try {
        users = await getUsers()
    } catch(e) {
        const { message } = e

        throw new Problem(503, null, null, {
            detail: message
        })
    }

    return users.map((user) => {
        user.password = AUTH_DUMMY_PASSWORD
        return user
    })
}
