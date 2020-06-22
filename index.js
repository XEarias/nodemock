require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const logMiddleware = require('./middlewares/logRequest')
const errorHandler = require('./middlewares/errorHandler')
const logger = require('./config/logger')

const routes = require('./routes')

const { API_PORT = 8080} = process.env

const app = express()

app.use(bodyParser.json())
app.use(logMiddleware)
app.use(routes)
app.use(errorHandler)

app.listen(API_PORT, () => {
    logger.info(`server listen on port: ${API_PORT}`)
})
