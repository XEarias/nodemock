/**
 * @jest-environment node
 */
            
jest.mock('../config/axios', () => ({
        get: jest.fn()
    })
)

const axios = require('../config/axios')
const { ERROR_NO_POLICIES, ERROR_NO_POLICY } = require('../config/const')

describe('getPolicies', () => {   
    describe('fetch policies fail', () => {
        beforeEach(() => {
            axios.get.mockRejectedValueOnce(new Error())
        })

        afterEach(jest.resetAllMocks)

        test('Must return a rejected promise', async () => {
            const policiesService = require('./policies')
            await expect(policiesService.getPolicies()).rejects.toBeDefined()
        })

        test('Promise throw ERROR_NO_POLICIES', async () => {
            const policiesService = require('./policies')
            await expect(policiesService.getPolicies()).rejects.toThrow(ERROR_NO_POLICIES)
        })
    })    
    describe('fetch policies success', () => {
        beforeEach(() => {   
            const fakePolicies = { 
                data: { 
                    policies: [
                        { id: "64cceef9-3a01-49ae-a23b-3761b604800b", amountInsured: 1825.89, email: "inesblankenship@quotezart.com", inceptionDate: "2016-06-01T03:33:32Z", installmentPayment: true, clientId: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb" }
                    ]
                } 
            }

            axios.get.mockResolvedValueOnce(fakePolicies)
        })

        afterEach(jest.resetAllMocks)

        test('Must return a fulfilled promise', async () => {
            const policiesService = require('./policies')
            await expect(policiesService.getPolicies()).resolves.toBeDefined()
        })

        test('Promise return Policies array', async () => {
            const policiesService = require('./policies')
            const policies = await policiesService.getPolicies()
            const expectedPolicies = [{ id: "64cceef9-3a01-49ae-a23b-3761b604800b", amountInsured: 1825.89, email: "inesblankenship@quotezart.com", inceptionDate: "2016-06-01T03:33:32Z", installmentPayment: true, clientId: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb" }]
            expect(expectedPolicies).toEqual(expect.arrayContaining(policies))
        })
    })
})

describe('getPolicyById', () => {
    describe('fetch policies fail', () => {
        const fakeId = '4b3109d9-46dc-4927-b064-099ab11118cf'
        
        beforeEach(() => {   
            axios.get.mockRejectedValueOnce(new Error())
        })

        afterEach(jest.resetAllMocks)

        test('Must return a rejected promise', async () => {
            const policiesService = require('./policies')
            await expect(policiesService.getPolicyById(fakeId)).rejects.toBeDefined()
        })

        test('Promise throw ERROR_NO_POLICIES', async () => {
            const policiesService = require('./policies')
            await expect(policiesService.getPolicyById(fakeId)).rejects.toThrow(ERROR_NO_POLICIES)
        })
    })    
    describe('fetch policies success', () => {
        describe('Exists matching Policy', () => {
            const fakeId = '64cceef9-3a01-49ae-a23b-3761b604800b'

            beforeEach(() => {
                const fakePolicies = { 
                    data: { 
                        policies: [
                            { id: "64cceef9-3a01-49ae-a23b-3761b604800b", amountInsured: 1825.89, email: "inesblankenship@quotezart.com", inceptionDate: "2016-06-01T03:33:32Z", installmentPayment: true, clientId: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb" }
                        ]
                    } 
                }
                
                axios.get.mockResolvedValueOnce(fakePolicies)
            })
    
            afterEach(jest.resetAllMocks)

            test('Must return a fulfilled promise', async () => {
                const policiesService = require('./policies')
                await expect(policiesService.getPolicyById(fakeId)).resolves.toBeDefined()
            })
    
            test('Promise return Policy object with maching Id', async () => {
                const policiesService = require('./policies')
                const policy = await policiesService.getPolicyById(fakeId)
                const expectedPolicy = { id: "64cceef9-3a01-49ae-a23b-3761b604800b", amountInsured: 1825.89, email: "inesblankenship@quotezart.com", inceptionDate: "2016-06-01T03:33:32Z", installmentPayment: true, clientId: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb" }
                expect(expectedPolicy).toEqual(policy)
            })
        })
        describe('Doenst exists matching Policy', () => {
            const fakeId = '4b3109d9-46dc-4927-b064-099ab11118cf'
            
            beforeEach(() => {
                const fakePolicies = { 
                    data: { 
                        policies: [
                            { id: "64cceef9-3a01-49ae-a23b-3761b604800b", amountInsured: 1825.89, email: "inesblankenship@quotezart.com", inceptionDate: "2016-06-01T03:33:32Z", installmentPayment: true, clientId: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb" }
                        ]
                    } 
                }
                
                axios.get.mockResolvedValueOnce(fakePolicies)
            })
    
            afterEach(jest.resetAllMocks)

            test('Must return a reject promise', async () => {
                const policiesService = require('./policies')
                await expect(policiesService.getPolicyById(fakeId)).rejects.toBeDefined()
            })
    
            test('Promise throw ERROR_NO_POLICY', async () => {
                const policiesService = require('./policies')
                await expect(policiesService.getPolicyById(fakeId)).rejects.toThrow(ERROR_NO_POLICY)
            })
        })    
    })
})

describe('getPoliciesByClientId', () => {
    describe('fetch policies fail', () => {
        const fakeId = '4b3109d9-46dc-4927-b064-099ab11118cf'
        
        beforeEach(() => {   
            axios.get.mockRejectedValueOnce(new Error())
        })

        afterEach(jest.resetAllMocks)

        test('Must return a rejected promise', async () => {
            const policiesService = require('./policies')
            await expect(policiesService.getPoliciesByClientId(fakeId)).rejects.toBeDefined()
        })

        test('Promise throw ERROR_NO_POLICIES', async () => {
            const policiesService = require('./policies')
            await expect(policiesService.getPoliciesByClientId(fakeId)).rejects.toThrow(ERROR_NO_POLICIES)
        })
    })
    describe('fetch policies success', () => {
        describe('Exists matching Policies', () => {
            const fakeId = '64cceef9-3a01-49ae-a23b-3761b604800b'

            beforeEach(() => {
                const fakePolicies = { 
                    data: { 
                        policies: [
                            { id: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb", amountInsured: 1825.89, email: "inesblankenship@quotezart.com", inceptionDate: "2016-06-01T03:33:32Z", installmentPayment: true, clientId: "64cceef9-3a01-49ae-a23b-3761b604800b" }
                        ]
                    } 
                }
                
                axios.get.mockResolvedValueOnce(fakePolicies)
            })
    
            afterEach(jest.resetAllMocks)

            test('Must return a fulfilled promise', async () => {
                const policiesService = require('./policies')
                await expect(policiesService.getPoliciesByClientId(fakeId)).resolves.toBeDefined()
            })
    
            test('Promise return Policy object with maching Id', async () => {
                const policiesService = require('./policies')
                const policies = await policiesService.getPoliciesByClientId(fakeId)
                const expectedPolicies = [{ id: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb", amountInsured: 1825.89, email: "inesblankenship@quotezart.com", inceptionDate: "2016-06-01T03:33:32Z", installmentPayment: true, clientId: "64cceef9-3a01-49ae-a23b-3761b604800b" }]
                expect(expectedPolicies).toEqual(policies)
            })
        })
        describe('Doenst exists matching Policies', () => {
            const fakeId = '4b3109d9-46dc-4927-b064-099ab11118cf'
            
            beforeEach(() => {
                const fakePolicies = { 
                    data: { 
                        policies: [
                            { id: "64cceef9-3a01-49ae-a23b-3761b604800b", amountInsured: 1825.89, email: "inesblankenship@quotezart.com", inceptionDate: "2016-06-01T03:33:32Z", installmentPayment: true, clientId: "e8fd159b-57c4-4d36-9bd7-a59ca13057bb" }
                        ]
                    } 
                }
                
                axios.get.mockResolvedValueOnce(fakePolicies)
            })
        })
    })
})
