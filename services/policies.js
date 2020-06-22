const logger = require('../config/logger')
const axios = require('../config/axios')

const {
    ERROR_NO_POLICIES,
    ERROR_NO_POLICY,
    ERROR_FETCH_POLICIES,
    ERROR_FETCH_POLICIES_RESPONSE_RECEIVED,
    ERROR_FETCH_POLICIES_RESPONSE_NO_RECEIVED
} = require('../config/const')

/**
 * Policy struct
 * @typedef {Object} Policy
 * @property {string} id
 * @property {Number} amountInsured
 * @property {string} inceptionDate
 * @property {Boolean} installmentPayment
 * @property {String} clientId
 */

/**
 * 
 * @returns {Promise<Policy[]>}
 */
const _fetchPolicies = async () => {
    const { data: { policies } } = await axios.get('/580891a4100000e8242b75c5')

    return policies
}

/**
 * 
 * @returns {Promise<Policy[]>}
 */
const getPolicies = async () => {
    let _policies

    try {
        _policies = await _fetchPolicies()
    } catch (e) {
        throw new Error(ERROR_NO_POLICIES)
    }

    return _policies
}

/**
 * @param {'id'|'amountInsured'|'inceptionDate'|'installmentPayment'|'clientId'} fieldToCheck 
 * @param {String} value 
 * 
 * @returns {Promise<Policy>}
 */

const _findPoliciesBy = async (fieldToCheck, value) => {
    const policies = await getPolicies()

    const valueLowerCase = value.toLowerCase()

    const policy = policies.find(({ [fieldToCheck]: field }) => field.toLowerCase() === valueLowerCase)

    if (!policy)
        throw new Error(ERROR_NO_POLICY)

    return policy
}

/**
 * 
 * @returns {Promise<Policy[]>}
 */

const _filterPoliciesBy = async (fieldToCheck, value) => {
    const policies = await getPolicies()

    const valueLowerCase = value.toLowerCase()

    const policy = policies.filter(({ [fieldToCheck]: field }) => field.toLowerCase() === valueLowerCase)

    if (!policy)
        throw new Error(ERROR_NO_POLICY)

    return policy
}

/* 
(async () => _policies = await _fetchPolicies())
().then(() => {
    logger.info('policies loaded')
    logger.debug(JSON.stringify(_policies))
})
    .catch((e) => {
        logger.crit(ERROR_FETCH_POLICIES)

        if (!e.isAxiosError) {
            logger.crit(e)
            return
        }

        const { response, request } = e

        if (!response) {
            logger.crit(ERROR_FETCH_POLICIES_RESPONSE_NO_RECEIVED)
            logger.crit(JSON.stringify(request))
            return
        }

        const { status, data, headers } = response

        logger.crit(ERROR_FETCH_POLICIES_RESPONSE_RECEIVED)

        logger.crit('Status:')
        logger.crit(status)

        logger.crit('Data:')
        logger.crit(JSON.stringify(data))

        logger.crit('Headers:')
        logger.crit(JSON.stringify(headers))
    })
 */

module.exports = {
    getPolicyById: async (policyId) => _findPoliciesBy('id', policyId),
    getPoliciesByClientId: async (clientId) => _filterPoliciesBy('clientId', clientId),
    getPolicies
}
