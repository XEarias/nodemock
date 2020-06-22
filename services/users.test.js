/**
 * @jest-environment node
 */
            
jest.mock('../config/axios', () => ({
        get: jest.fn()
    })
)

const axios = require('../config/axios')
const { ERROR_NO_USERS, ERROR_NO_USER } = require('../config/const')

describe('getUsers', () => {   
    describe('fetch users fail', () => {
        beforeEach(() => {
            axios.get.mockRejectedValueOnce(new Error())
        })

        afterEach(jest.resetAllMocks)

        test('Must return a rejected promise', async () => {
            const usersService = require('./users')
            await expect(usersService.getUsers()).rejects.toBeDefined()
        })

        test('Promise throw ERROR_NO_USERS', async () => {
            const usersService = require('./users')
            await expect(usersService.getUsers()).rejects.toThrow(ERROR_NO_USERS)
        })
    })    
    describe('fetch users success', () => {
        beforeEach(() => {   
            const fakeClients = { 
                data: { 
                    clients: [
                        { id: '4b3109d9-46dc-4927-b064-099ab11118cf', name: 'fake', email: "fake@fake.com", role: "admin"}
                    ]
                } 
            }

            axios.get.mockResolvedValueOnce(fakeClients)
        })

        afterEach(jest.resetAllMocks)

        test('Must return a fulfilled promise', async () => {
            const usersService = require('./users')
            await expect(usersService.getUsers()).resolves.toBeDefined()
        })

        test('Promise return Users array', async () => {
            const usersService = require('./users')
            const users = await usersService.getUsers()
            const expectedUsers = [{ id: '4b3109d9-46dc-4927-b064-099ab11118cf', name: 'fake', email: "fake@fake.com", role: "admin"}]
            expect(expectedUsers).toEqual(expect.arrayContaining(users))
        })
    })
})

describe('getUsersById', () => {
    describe('fetch users fail', () => {
        const fakeId = '4b3109d9-46dc-4927-b064-099ab11118cf'
        
        beforeEach(() => {   
            axios.get.mockRejectedValueOnce(new Error())
        })

        afterEach(jest.resetAllMocks)

        test('Must return a rejected promise', async () => {
            const usersService = require('./users')
            await expect(usersService.getUsersById(fakeId)).rejects.toBeDefined()
        })

        test('Promise throw ERROR_NO_USERS', async () => {
            const usersService = require('./users')
            await expect(usersService.getUsersById(fakeId)).rejects.toThrow(ERROR_NO_USERS)
        })
    })    
    describe('fetch users success', () => {
        describe('Exists matching User', () => {
            const fakeId = '4b3109d9-46dc-4927-b064-099ab11118cf'

            beforeEach(() => {
                const fakeClients = { 
                    data: { 
                        clients: [
                            { id: '4b3109d9-46dc-4927-b064-099ab11118cf', name: 'fake', email: "fake@fake.com", role: "admin"}
                        ]
                    } 
                }
                
                axios.get.mockResolvedValueOnce(fakeClients)
            })
    
            afterEach(jest.resetAllMocks)

            test('Must return a fulfilled promise', async () => {
                const usersService = require('./users')
                await expect(usersService.getUsersById(fakeId)).resolves.toBeDefined()
            })
    
            test('Promise return User object with maching Id', async () => {
                const usersService = require('./users')
                const user = await usersService.getUsersById(fakeId)
                const expectedUser = { id: '4b3109d9-46dc-4927-b064-099ab11118cf', name: 'fake', email: "fake@fake.com", role: "admin"}
                expect(expectedUser).toEqual(user)
            })
        })
        describe('Doenst exists matching User', () => {
            const fakeId = '4b3109d9-46dc-4927-b064-099ab11118cf'
            
            beforeEach(() => {
                const fakeClients = { 
                    data: { 
                        clients: [
                            { id: '000000-46dc-4927-b064-xxxxxxxxx', name: 'fake', email: "fake@fake.com", role: "admin"}
                        ]
                    } 
                }
                
                axios.get.mockResolvedValueOnce(fakeClients)
            })
    
            afterEach(jest.resetAllMocks)

            test('Must return a reject promise', async () => {
                const usersService = require('./users')
                await expect(usersService.getUsersById(fakeId)).rejects.toBeDefined()
            })
    
            test('Promise throw ERROR_NO_USER', async () => {
                const usersService = require('./users')
                await expect(usersService.getUsersById(fakeId)).rejects.toThrow(ERROR_NO_USER)
            })
        })

       
    })
})


describe('getUsersByName', () => {
    describe('fetch users fail', () => {
        const fakeName = 'Britany'
        
        beforeEach(() => {   
            axios.get.mockRejectedValueOnce(new Error())
        })

        afterEach(jest.resetAllMocks)

        test('Must return a rejected promise', async () => {
            const usersService = require('./users')
            await expect(usersService.getUsersByName(fakeName)).rejects.toBeDefined()
        })

        test('Promise throw ERROR_NO_USERS', async () => {
            const usersService = require('./users')
            await expect(usersService.getUsersByName(fakeName)).rejects.toThrow(ERROR_NO_USERS)
        })
    })    
    describe('fetch users success', () => {
        describe('Exists matching User', () => {
            const fakeName = 'Britany'

            beforeEach(() => {
                const fakeClients = { 
                    data: { 
                        clients: [
                            { id: '4b3109d9-46dc-4927-b064-099ab11118cf', name: 'Britany', email: "fake@fake.com", role: "admin"}
                        ]
                    } 
                }
                
                axios.get.mockResolvedValueOnce(fakeClients)
            })
    
            afterEach(jest.resetAllMocks)

            test('Must return a fulfilled promise', async () => {
                const usersService = require('./users')
                await expect(usersService.getUsersByName(fakeName)).resolves.toBeDefined()
            })
    
            test('Promise return User object with maching Id', async () => {
                const usersService = require('./users')
                const user = await usersService.getUsersByName(fakeName)
                const expectedUser = { id: '4b3109d9-46dc-4927-b064-099ab11118cf', name: 'Britany', email: "fake@fake.com", role: "admin"}
                expect(expectedUser).toEqual(user)
            })
        })
        describe('Doenst exists matching User', () => {
            const fakeName = 'Britany'
            
            beforeEach(() => {
                const fakeClients = { 
                    data: { 
                        clients: [
                            { id: '000000-46dc-4927-b064-xxxxxxxxx', name: 'Chris', email: "fake@fake.com", role: "admin"}
                        ]
                    } 
                }
                
                axios.get.mockResolvedValueOnce(fakeClients)
            })
    
            afterEach(jest.resetAllMocks)

            test('Must return a reject promise', async () => {
                const usersService = require('./users')
                await expect(usersService.getUsersByName(fakeName)).rejects.toBeDefined()
            })
    
            test('Promise throw ERROR_NO_USER', async () => {
                const usersService = require('./users')
                await expect(usersService.getUsersByName(fakeName)).rejects.toThrow(ERROR_NO_USER)
            })
        })

       
    })
})