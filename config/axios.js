const { create } = require('axios')

//TODO: interceptors

module.exports = create({
    baseURL: 'http://www.mocky.io/v2'
})