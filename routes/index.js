const router = require('express').Router()
const usersRoutes = require('./users')
const policiesRoutes = require('./policies')
const authRoutes = require('./auth')

router.use('/users', usersRoutes)
router.use('/policies', policiesRoutes)
router.use('/auth', authRoutes)

module.exports = router