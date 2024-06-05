import request from 'supertest'
import app from '../../app.js'

describe('Balance', () => {
  it('should return balance on GET /get_balance', async () => {
    const response = await request(app)
      .get('/api/v1/user/get_balance')
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)

    expect(response.status).toBe(200)
    const data = JSON.parse(response.text)
    expect(data.ok).toBe(true)
    expect(typeof data.value.dataLimit).toBe('number')
    expect(typeof data.value.dataUsed).toBe('number')
  })
})
