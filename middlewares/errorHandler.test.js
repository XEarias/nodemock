/**
 * @jest-environment node
 */

const mockApiProblemMiddleware = jest.fn()

jest.mock('api-problem/lib/middleware', () => () => mockApiProblemMiddleware)

const Problem = require('api-problem')
const { ERROR_NO_POLICIES, ERROR_NO_POLICY, ERROR_NO_USER, ERROR_NO_USERS } = require('../config/const')

describe('Receive instance of Problem', () => {
    let err, req, res, next

    beforeEach(() => {
        req = {
            originalUrl: '/fake/url'
        }
        res = 'fakeRes'
        next = 'fakeNext'
        err = new Problem(500, null, null, { instance: '/fake/url' })
    })

    afterEach(jest.resetAllMocks)
    
    test('Must call Api Problem Middlware with 4 params', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls.length).toBe(1)
        expect(mockApiProblemMiddleware.mock.calls[0].length).toBe(4)
    })

    test('Must pass same req, res and next Objects', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][1]).toMatchObject({
            originalUrl: '/fake/url'
        })
        expect(mockApiProblemMiddleware.mock.calls[0][2]).toBe('fakeRes')
        expect(mockApiProblemMiddleware.mock.calls[0][3]).toBe('fakeNext')
    })

    test('Must pass a instance of Problem', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][0]).toBeInstanceOf(Problem)
    })

    test('Must pass same Problem', () => {
        const errorHandler = require('./errorHandler')
        const expectedProblem = new Problem(500, null, null, {
            instance: '/fake/url'
        })

        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][0]).toMatchObject(expectedProblem)
    })
})

describe('Receive Authentication Error', () => {
    let err, req, res, next

    beforeEach(() => {
        req = {
            originalUrl: '/fake/url'
        }
        res = 'fakeRes'
        next = 'fakeNext'
        err = new Error('fakeAuthenticationError')
        err.name = 'UnauthorizedError'
    })

    afterEach(jest.resetAllMocks)
    
    test('Must call Api Problem Middlware with 4 params', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls.length).toBe(1)
        expect(mockApiProblemMiddleware.mock.calls[0].length).toBe(4)
    })

    test('Must pass same req, res and next Objects', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][1]).toMatchObject({
            originalUrl: '/fake/url'
        })
        expect(mockApiProblemMiddleware.mock.calls[0][2]).toBe('fakeRes')
        expect(mockApiProblemMiddleware.mock.calls[0][3]).toBe('fakeNext')
    })

    test('Must pass a instance of Problem', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][0]).toBeInstanceOf(Problem)
    })

    test('Must pass Authentication Problem', () => {
        const errorHandler = require('./errorHandler')
        const expectedProblem = new Problem(401, null, null, {
            instance: '/fake/url',
            detail: 'fakeAuthenticationError'
        })

        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][0]).toMatchObject(expectedProblem)
    })
})

describe('Receive Authorization Error', () => {
    let err, req, res, next

    beforeEach(() => {
        req = {
            originalUrl: '/fake/url'
        }
        res = 'fakeRes'
        next = 'fakeNext'
        err = new Error('fakeAuthorizationError')
        err.code = 'permission_denied'
    })

    afterEach(jest.resetAllMocks)
    
    test('Must call Api Problem Middlware with 4 params', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls.length).toBe(1)
        expect(mockApiProblemMiddleware.mock.calls[0].length).toBe(4)
    })

    test('Must pass same req, res and next Objects', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][1]).toMatchObject({
            originalUrl: '/fake/url'
        })
        expect(mockApiProblemMiddleware.mock.calls[0][2]).toBe('fakeRes')
        expect(mockApiProblemMiddleware.mock.calls[0][3]).toBe('fakeNext')
    })

    test('Must pass a instance of Problem', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][0]).toBeInstanceOf(Problem)
    })

    test('Must pass Authorization Problem', () => {
        const errorHandler = require('./errorHandler')
        const expectedProblem = new Problem(403, null, null, {
            instance: '/fake/url',
            detail: 'fakeAuthorizationError'
        })

        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][0]).toMatchObject(expectedProblem)
    })
})

describe('Receive Unhandled Error', () => {
    let err, req, res, next

    beforeEach(() => {
        req = {
            originalUrl: '/fake/url'
        }
        res = 'fakeRes'
        next = 'fakeNext'
        err = new Error('fakeUnhandledError')
    })

    afterEach(jest.resetAllMocks)
    
    test('Must call Api Problem Middlware with 4 params', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls.length).toBe(1)
        expect(mockApiProblemMiddleware.mock.calls[0].length).toBe(4)
    })

    test('Must pass same req, res and next Objects', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][1]).toMatchObject({
            originalUrl: '/fake/url'
        })
        expect(mockApiProblemMiddleware.mock.calls[0][2]).toBe('fakeRes')
        expect(mockApiProblemMiddleware.mock.calls[0][3]).toBe('fakeNext')
    })

    test('Must pass a instance of Problem', () => {
        const errorHandler = require('./errorHandler')
    
        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][0]).toBeInstanceOf(Problem)
    })

    test('Must pass Problem with same message', () => {
        const errorHandler = require('./errorHandler')
        const expectedProblem = new Problem(500, null, null, {
            instance: '/fake/url',
            detail: 'fakeUnhandledError'
        })

        errorHandler(err, req, res, next)

        expect(mockApiProblemMiddleware.mock.calls[0][0]).toMatchObject(expectedProblem)
    })
}) 

describe('Receive Controller Error', () => {
    describe('Receive Controller Error ERROR_NO_POLICY', () => {
        let err, req, res, next

        beforeEach(() => {
            req = {
                originalUrl: '/fake/url'
            }
            res = 'fakeRes'
            next = 'fakeNext'
            err = new Error(ERROR_NO_POLICY)
        })
    
        afterEach(jest.resetAllMocks)
        
        test('Must call Api Problem Middlware with 4 params', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls.length).toBe(1)
            expect(mockApiProblemMiddleware.mock.calls[0].length).toBe(4)
        })
    
        test('Must pass same req, res and next Objects', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][1]).toMatchObject({
                originalUrl: '/fake/url'
            })
            expect(mockApiProblemMiddleware.mock.calls[0][2]).toBe('fakeRes')
            expect(mockApiProblemMiddleware.mock.calls[0][3]).toBe('fakeNext')
        })
    
        test('Must pass a instance of Problem', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][0]).toBeInstanceOf(Problem)
        })
    
        test('Must pass Problem ERROR_NO_POLICY', () => {
            const errorHandler = require('./errorHandler')
            const expectedProblem = new Problem(404, null, null, {
                instance: '/fake/url',
                detail: ERROR_NO_POLICY
            })
    
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][0]).toMatchObject(expectedProblem)
        })
    })
    describe('Receive Controller Error ERROR_NO_POLICIES', () => {
        let err, req, res, next

        beforeEach(() => {
            req = {
                originalUrl: '/fake/url'
            }
            res = 'fakeRes'
            next = 'fakeNext'
            err = new Error(ERROR_NO_POLICIES)
        })
    
        afterEach(jest.resetAllMocks)
        
        test('Must call Api Problem Middlware with 4 params', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls.length).toBe(1)
            expect(mockApiProblemMiddleware.mock.calls[0].length).toBe(4)
        })
    
        test('Must pass same req, res and next Objects', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][1]).toMatchObject({
                originalUrl: '/fake/url'
            })
            expect(mockApiProblemMiddleware.mock.calls[0][2]).toBe('fakeRes')
            expect(mockApiProblemMiddleware.mock.calls[0][3]).toBe('fakeNext')
        })
    
        test('Must pass a instance of Problem', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][0]).toBeInstanceOf(Problem)
        })
    
        test('Must pass Problem ERROR_NO_POLICIES', () => {
            const errorHandler = require('./errorHandler')
            const expectedProblem = new Problem(404, null, null, {
                instance: '/fake/url',
                detail: ERROR_NO_POLICIES
            })
    
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][0]).toMatchObject(expectedProblem)
        })
    })
    describe('Receive Controller Error ERROR_NO_USER', () => {
        let err, req, res, next

        beforeEach(() => {
            req = {
                originalUrl: '/fake/url'
            }
            res = 'fakeRes'
            next = 'fakeNext'
            err = new Error(ERROR_NO_USER)
        })
    
        afterEach(jest.resetAllMocks)
        
        test('Must call Api Problem Middlware with 4 params', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls.length).toBe(1)
            expect(mockApiProblemMiddleware.mock.calls[0].length).toBe(4)
        })
    
        test('Must pass same req, res and next Objects', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][1]).toMatchObject({
                originalUrl: '/fake/url'
            })
            expect(mockApiProblemMiddleware.mock.calls[0][2]).toBe('fakeRes')
            expect(mockApiProblemMiddleware.mock.calls[0][3]).toBe('fakeNext')
        })
    
        test('Must pass a instance of Problem', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][0]).toBeInstanceOf(Problem)
        })
    
        test('Must pass Problem ERROR_NO_USER', () => {
            const errorHandler = require('./errorHandler')
            const expectedProblem = new Problem(404, null, null, {
                instance: '/fake/url',
                detail: ERROR_NO_USER
            })
    
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][0]).toMatchObject(expectedProblem)
        })
    })
    describe('Receive Controller Error ERROR_NO_USERS', () => {
        let err, req, res, next

        beforeEach(() => {
            req = {
                originalUrl: '/fake/url'
            }
            res = 'fakeRes'
            next = 'fakeNext'
            err = new Error(ERROR_NO_USERS)
        })
    
        afterEach(jest.resetAllMocks)
        
        test('Must call Api Problem Middlware with 4 params', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls.length).toBe(1)
            expect(mockApiProblemMiddleware.mock.calls[0].length).toBe(4)
        })
    
        test('Must pass same req, res and next Objects', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][1]).toMatchObject({
                originalUrl: '/fake/url'
            })
            expect(mockApiProblemMiddleware.mock.calls[0][2]).toBe('fakeRes')
            expect(mockApiProblemMiddleware.mock.calls[0][3]).toBe('fakeNext')
        })
    
        test('Must pass a instance of Problem', () => {
            const errorHandler = require('./errorHandler')
        
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][0]).toBeInstanceOf(Problem)
        })
    
        test('Must pass Problem ERROR_NO_USERS', () => {
            const errorHandler = require('./errorHandler')
            const expectedProblem = new Problem(404, null, null, {
                instance: '/fake/url',
                detail: ERROR_NO_USERS
            })
    
            errorHandler(err, req, res, next)
    
            expect(mockApiProblemMiddleware.mock.calls[0][0]).toMatchObject(expectedProblem)
        })
    })
})