/**
 * @jest-environment node
 */
            
jest.mock('../services/users', () => ({
        getUsers: jest.fn()
    })
)

const Problem = require('api-problem')
const usersService = require('../services/users')


describe('get users fail', () => {
    beforeEach(() => {
        usersService.getUsers.mockRejectedValueOnce(new Error('FakeMessage'))
    })

    afterEach(jest.resetAllMocks)

    test('Must return a rejected promise', async () => {
        const getUsersAuth = require('./getUsersAuth')
        await expect(getUsersAuth()).rejects.toBeDefined()
    })

    test('Promise throw ApiProblem', async () => {
        const getUsersAuth = require('./getUsersAuth')

        await expect(getUsersAuth()).rejects.toBeInstanceOf(Problem)
    })
})    
describe('get users success', () => {
    beforeEach(() => {   
        const fakeClients = [
            { id: '4b3109d9-46dc-4927-b064-099ab11118cf', name: 'fake', email: "fake@fake.com", role: "admin"}
        ]

        usersService.getUsers.mockResolvedValueOnce(fakeClients)
    })

    afterEach(jest.resetAllMocks)

    test('Must return a fulfilled promise', async () => {
        const getUsersAuth = require('./getUsersAuth')
        await expect(getUsersAuth()).resolves.toBeDefined()
    })

    test('Promise return Users array', async () => {
        const getUsersAuth = require('./getUsersAuth')
        const users = await getUsersAuth()
        const expectedUsers = [{ id: '4b3109d9-46dc-4927-b064-099ab11118cf', name: 'fake', email: "fake@fake.com", role: "admin", password: 'dummyPassword'}]
        expect(expectedUsers).toEqual(expect.arrayContaining(users))
    })
})
