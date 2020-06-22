/**
 * @jest-environment node
 */

const mockToISOString = jest.fn()
const mockWarning = jest.fn()
const mockInfo = jest.fn()

jest.mock('moment', () => () => ({ toISOString: mockToISOString }))

jest.mock('../config/logger', () => ({ info: mockInfo, warning: mockWarning }))

const EventEmitter = require('events')
const moment = require('moment')

describe('Request emit Finish event', () => {
    describe('Response with status 500 or higher', () => { 
        let req, res, next

        beforeEach(() => {
            mockToISOString.mockReturnValueOnce('2020-06-21T14:43:36.651Z')
            req = {
                originalUrl: '/fake/url',
                method: 'GET'
            }
            res = new EventEmitter()
            res.statusCode = 503
            next = jest.fn()
        })

        afterEach(jest.resetAllMocks)

        test('Must have a Event Listener to Event "finish"', async () => {
            const logRequest = require('./logRequest')
            logRequest(req, res, next)
            
            const existListener = res.emit('finish')
            
            await new Promise((resolve) => setImmediate(resolve))

            expect(existListener).toBeTruthy()
        })

        test('Must have called next handler without arguments', async () => {
            const logRequest = require('./logRequest')
            logRequest(req, res, next)
            
            res.emit('finish')
            
            await new Promise((resolve) => setImmediate(resolve))

            expect(next.mock.calls.length).toBe(1)
            expect(next.mock.calls[0].length).toBe(0)
        })

        test('Must have called logger.warning', async () => {
            const logRequest = require('./logRequest')
            logRequest(req, res, next)
            
            res.emit('finish')
            
            await new Promise((resolve) => setImmediate(resolve))
            
            expect(mockWarning.mock.calls.length).toBe(1)
            expect(mockWarning.mock.calls[0][0]).toBe(`2020-06-21T14:43:36.651Z: 503 - GET /fake/url`)
        })
    })
    describe('Response with status below 500', () => {
        let req, res, next

        beforeEach(() => {
            mockToISOString.mockReturnValueOnce('2020-06-21T14:43:36.651Z')
            req = {
                originalUrl: '/fake/url',
                method: 'GET'
            }
            res = new EventEmitter()
            res.statusCode = 200
            next = jest.fn()
        })

        afterEach(jest.resetAllMocks)

        test('Must have a Event Listener to Event "finish"', async () => {
            const logRequest = require('./logRequest')
            logRequest(req, res, next)
            
            const existListener = res.emit('finish')
            
            await new Promise((resolve) => setImmediate(resolve))

            expect(existListener).toBeTruthy()
        })

        test('Must have called next handler without arguments', async () => {
            const logRequest = require('./logRequest')
            logRequest(req, res, next)
            
            res.emit('finish')
            
            await new Promise((resolve) => setImmediate(resolve))

            expect(next.mock.calls.length).toBe(1)
            expect(next.mock.calls[0].length).toBe(0)
        })

        test('Must have called logger.info', async () => {
            const logRequest = require('./logRequest')
            logRequest(req, res, next)
            
            res.emit('finish')
            
            await new Promise((resolve) => setImmediate(resolve))
            
            expect(mockInfo.mock.calls.length).toBe(1)
            expect(mockInfo.mock.calls[0][0]).toBe(`2020-06-21T14:43:36.651Z: 200 - GET /fake/url`)
        })
    })
})