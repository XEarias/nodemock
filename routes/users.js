const router = require("express-async-router").AsyncRouter()
const { getUserById, getUserByName, getPoliciesByUserName } = require('./../controllers/users')
const authMiddleare = require('../middlewares/auth')
const { ROLE_ADMIN, ROLE_USER } = require('../config/const')

router.get('/:userId([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})', authMiddleare([ROLE_ADMIN, ROLE_USER]), getUserById)
router.get('/:name([a-zA-Z]{1,})', authMiddleare([ROLE_ADMIN, ROLE_USER]), getUserByName)
router.get('/:name([a-zA-Z]{1,})/policies', authMiddleare([ROLE_ADMIN]), getPoliciesByUserName)

module.exports = router