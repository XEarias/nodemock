/**
 * @jest-environment node
 */
const mockGetUsersByIdService = jest.fn() 
const mockGetUserByNameService = jest.fn() 
const mockGetPoliciesByUserNameService = jest.fn() 
 
jest.mock('../services/users', () => ({
        getUsersById: mockGetUsersByIdService,
        getUsersByName: mockGetUserByNameService,
        getPoliciesByUserName: mockGetPoliciesByUserNameService
    })
)
describe('getUserById', () => {
    describe('usersService Success', () => {
        let req, res

        beforeEach(() => {
            req = { 
                params: { userId: '000000-46dc-4927-b064-xxxxxxxxx' }
            }

            res = {
                json: jest.fn()
            }

            mockGetUsersByIdService.mockResolvedValueOnce({ id: '000000-46dc-4927-b064-xxxxxxxxx', name: 'Chris', email: "fake@fake.com", role: "admin"})
        })
    
        afterEach(jest.resetAllMocks)

        test('Must return a fulfilled promise', async () => {
            const { getUserById } = require('./users')

            await expect(getUserById(req, res)).resolves.toBeUndefined()
        })

        test('Must call getUsersByIdService with userId', async () => {
            const { getUserById } = require('./users')

            await getUserById(req, res)

            expect(mockGetUsersByIdService.mock.calls.length).toBe(1)
            expect(mockGetUsersByIdService.mock.calls[0][0]).toBe('000000-46dc-4927-b064-xxxxxxxxx')
        })

        test('Must return user from service', async () => {
            const { getUserById } = require('./users')

            await getUserById(req, res)

            expect(res.json.mock.calls.length).toBe(1)
            expect(res.json.mock.calls[0][0]).toMatchObject({ id: '000000-46dc-4927-b064-xxxxxxxxx', name: 'Chris', email: "fake@fake.com", role: "admin"})
        })
    })
    describe('usersService throw Error', () => {
        let req, res

        beforeEach(() => {
            req = { 
                params: { userId: '000000-46dc-4927-b064-xxxxxxxxx' }
            }

            res = {
                json: jest.fn()
            }

            mockGetUsersByIdService.mockRejectedValueOnce(new Error('fakeError'))
        })
    
        afterEach(jest.resetAllMocks)
        
        test('Must be a rejected promise', async () => {
            const { getUserById } = require('./users')

            await expect(getUserById(req, res)).rejects.toBeDefined()
        })

        test('Must call getUsersByIdService with userId', async () => {
            const { getUserById } = require('./users')

            try {
                await getUserById(req, res) 
            } catch {

            }

            expect(mockGetUsersByIdService.mock.calls.length).toBe(1)
            expect(mockGetUsersByIdService.mock.calls[0][0]).toBe('000000-46dc-4927-b064-xxxxxxxxx')
        })

        test('Must throw getUsersByIdService exception', async () => {
            const { getUserById } = require('./users')


            await expect(getUserById(req, res)).rejects.toMatchObject(new Error('fakeError'))
        })
    })
})

describe('getUserByName', () => {
    describe('usersService Success', () => {
        let req, res

        beforeEach(() => {
            req = { 
                params: { name: 'Chris' }
            }

            res = {
                json: jest.fn()
            }

            mockGetUserByNameService.mockResolvedValueOnce({ id: '000000-46dc-4927-b064-xxxxxxxxx', name: 'Chris', email: "fake@fake.com", role: "admin"})
        })
    
        afterEach(jest.resetAllMocks)

        test('Must return a fulfilled promise', async () => {
            const { getUserByName } = require('./users')

            await expect(getUserByName(req, res)).resolves.toBeUndefined()
        })

        test('Must call getUsersByIdService with name', async () => {
            const { getUserByName } = require('./users')

            await getUserByName(req, res)

            expect(mockGetUserByNameService.mock.calls.length).toBe(1)
            expect(mockGetUserByNameService.mock.calls[0][0]).toBe('Chris')
        })

        test('Must return user from service', async () => {
            const { getUserByName } = require('./users')

            await getUserByName(req, res)

            expect(res.json.mock.calls.length).toBe(1)
            expect(res.json.mock.calls[0][0]).toMatchObject({ id: '000000-46dc-4927-b064-xxxxxxxxx', name: 'Chris', email: "fake@fake.com", role: "admin"})
        })
    })
    describe('usersService throw Error', () => {
        let req, res

        beforeEach(() => {
            req = { 
                params: { name: 'Chris' }
            }

            res = {
                json: jest.fn()
            }

            mockGetUserByNameService.mockRejectedValueOnce(new Error('fakeError'))
        })
    
        afterEach(jest.resetAllMocks)
        
        test('Must be a rejected promise', async () => {
            const { getUserByName } = require('./users')

            await expect(getUserByName(req, res)).rejects.toBeDefined()
        })

        test('Must call getUsersByNameService with name', async () => {
            const { getUserByName } = require('./users')

            try {
                await getUserByName(req, res) 
            } catch {

            }

            expect(mockGetUserByNameService.mock.calls.length).toBe(1)
            expect(mockGetUserByNameService.mock.calls[0][0]).toBe('Chris')
        })

        test('Must throw getUsersByNameService exception', async () => {
            const { getUserByName } = require('./users')


            await expect(getUserByName(req, res)).rejects.toMatchObject(new Error('fakeError'))
        })
    })
})