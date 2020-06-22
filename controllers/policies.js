const logger = require('../config/logger')
const { getPolicyById: getPolicyByIdService } = require('../services/policies')
const { getUsersById: getUsersByIdService } = require('../services/users')

module.exports = {
    async getUserByPolicyId(req, res) {
        const { params: { policyId } } = req
        const { clientId: userId } = await getPolicyByIdService(policyId)

        const user = await getUsersByIdService(userId)

        res.json(user)
    }
}