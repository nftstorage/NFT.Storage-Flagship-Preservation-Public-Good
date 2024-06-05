import request from 'supertest'
import app from '../../app.js'
import { getAccessToken } from '../../controller/authentication/helper/jwt.js'

describe('Auth', () => {
  it('should create API Key GET /create_api_key', async () => {
    const token = getAccessToken('82a6429f-cba4-4c34-81f6-f8ec509d3d55', false)
    const response = await request(app)
      .get('/api/v1/auth/create_api_key?keyName=admin&role=admin')
      .set('Authorization', `Bearer ${token.accessToken}`)

    expect(response.status).toBe(200)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(true)
    expect(typeof responseJSON.value.apiKey).toBe('string')
  }, 10000)

  it('should list all API Keys GET /list_api_keys', async () => {
    const response = await request(app)
      .get('/api/v1/auth/list_api_keys')
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)

    expect(response.status).toBe(200)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(true)

    expect(typeof responseJSON.value[0].keyID).toBe('string')
    expect(typeof responseJSON.value[0].keyName).toBe('string')
    expect(typeof responseJSON.value[0].userRole).toBe('string')
    expect(typeof responseJSON.value[0].createdAt).toBe('number')
    expect(typeof responseJSON.value[0].lastUsed).toBe('number')
  }, 10000)
})
