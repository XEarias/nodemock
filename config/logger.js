const { createLogger, format, transports, config } = require('winston')

const { LOG_LEVEL } = process.env

const logger = createLogger({
    level: LOG_LEVEL || 'info',
    levels: config.syslog.levels,
    transports: [
      new (transports.Console)({
          format: format.combine(format.colorize(),
          format.simple())
      })
    ]
  })


module.exports = logger