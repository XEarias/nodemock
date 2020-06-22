const moment = require('moment')
const logger = require('../config/logger')

module.exports = (req, res, next) => {
    const { originalUrl: url, method } = req
    const time = moment().toISOString()

    res.on('finish', () => {
        const { statusCode: status } = res
        logger[ status < 500 ? 'info' : 'warning'](`${time}: ${status} - ${method} ${url}`)
    })

    next()
}