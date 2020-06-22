const logger = require('../config/logger')
const { getUsersById: getUsersByIdService, getUsersByName: getUsersByNameService, getUsersByName } = require('../services/users')
const { getPoliciesByClientId: getPoliciesByClientIdService } = require('../services/policies')

module.exports = {
    async getUserById(req, res) {
        const { params: { userId }} = req

        const user = await getUsersByIdService(userId)

        res.json(user)
    },
    async getUserByName(req, res) {
        const { params: { name }} = req

        const user = await getUsersByNameService(name)

        res.json(user)
    },
    async getPoliciesByUserName(req, res) {
        const { params: { name }} = req

        const { id: userId } = await getUsersByNameService(name)

        const policy = await getPoliciesByClientIdService(userId)

        res.json(policy)
    }
}