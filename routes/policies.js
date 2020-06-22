const router = require("express-async-router").AsyncRouter()
const { getUserByPolicyId } = require('../controllers/policies')
const authMiddleare = require('../middlewares/auth')
const { ROLE_ADMIN } = require('../config/const')

router.get('/:policyId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/users', ...authMiddleare([ROLE_ADMIN]), getUserByPolicyId)

module.exports = router