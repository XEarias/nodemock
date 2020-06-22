const router = require("express-async-router").AsyncRouter()
const { getUserByPolicyId } = require('../controllers/policies')
const { login } = require('../middlewares/auth/jwt')

const { AUTH_TYPE='none' } = process.env

if(AUTH_TYPE === 'jwt') {
    router.post('/login', login)
}


module.exports = router