import { GET } from './route'
import { NextRequest } from 'next/server'


describe('GET /api/recommendations', () => {
    it('should generate and save recommendations', async () => {
        const userID = '12345'
        const params = Promise.resolve({ userRef: userID })

        // Create a mock request
        const mockRequest = new NextRequest(`http://localhost:3000/api/users/${userID}/recommendations`)

        // Act: Call the GET handler
        const response = await GET(mockRequest, { params })

        // Assert: Check that the response matches the mocked result
        expect(response.status).toBe(200)

        const res = await response.json()
        expect(res.clientId).toEqual(userID)
        expect(Array.isArray(res.promotions)).toBe(true)
    })

    it('should return a 400 error if the request body is invalid', async () => {
        const userID = '' // Missing userID
        const params = Promise.resolve({ userRef: userID })
        // Arrange: Create a mock request with missing fields
        const mockRequest = new NextRequest('http://localhost:3000/api/users/${userID}/recommendations')

        // Act: Call the GET handler
        const response = await GET(mockRequest, { params })

        // Assert: Check that the response status is 400 (bad request)
        expect(response.status).toBe(400)
    })

    it('should return a 400 error if the request body is invalid', async () => {
        const userID = '321' // Non-exist userID
        const params = Promise.resolve({ userRef: userID })
        // Arrange: Create a mock request with missing fields
        const mockRequest = new NextRequest('http://localhost:3000/api/users/${userID}/recommendations')

        // Act: Call the GET handler
        const response = await GET(mockRequest, { params })

        // Assert: Check that the response status is 404 (bad request)
        expect(response.status).toBe(404)
    })
})