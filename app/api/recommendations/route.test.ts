import { POST } from './route'
import { NextRequest } from 'next/server'


describe('POST /api/recommendations', () => {
    it('should generate and save recommendations', async () => {
        const userID = '12345'

        // Create a mock request
        const mockRequest = new NextRequest('http://localhost:3000/api/recommendations', {
            method: 'POST',
            body: JSON.stringify({
                clientId: userID,
                productInterests: ['science fiction', 'artificial intelligence', 'space exploration']
            })
        })

        // Act: Call the POST handler
        const response = await POST(mockRequest)

        // Assert: Check that the response matches the mocked result
        expect(response.status).toBe(200)

        const res = await response.json()
        expect(res.clientId).toEqual(userID)
        expect(Array.isArray(res.promotions)).toBe(true)
    })

    it('should return a 400 error if the request body is invalid', async () => {
        const userID = '12345'
        // Arrange: Create a mock request with missing fields
        const mockRequest = new NextRequest('http://localhost:3000/api/recommendations', {
            method: 'POST',
            body: JSON.stringify({ clientId: userID }), // Missing productInterests
        })

        // Act: Call the POST handler
        const response = await POST(mockRequest)

        // Assert: Check that the response status is 400 (bad request)
        expect(response.status).toBe(400)
    })

    it('should return a 400 error if the request body is invalid', async () => {
        // Arrange: Create a mock request with missing fields
        const mockRequest = new NextRequest('http://localhost:3000/api/recommendations', {
            method: 'POST',
            body: JSON.stringify({ productInterests: ['science fiction', 'artificial intelligence', 'space exploration'] }), // Missing clientId
        })

        // Act: Call the POST handler
        const response = await POST(mockRequest)

        // Assert: Check that the response status is 400 (bad request)
        expect(response.status).toBe(400)
    })
})