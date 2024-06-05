import request from 'supertest'
import app from '../../app.js'

describe('Collection', () => {
  it('should return collection list" on GET /list_collections', async () => {
    const response = await request(app)
      .get('/api/v1/collection/list_collections')
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)

    expect(response.status).toBe(200)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(true)

    expect(typeof responseJSON.value[0].collectionID).toBe('string')
    expect(typeof responseJSON.value[0].collectionName).toBe('string')
    expect(typeof responseJSON.value[0].contractAddress).toBe('string')
    expect(typeof responseJSON.value[0].chainID).toBe('string')
    expect(typeof responseJSON.value[0].blockchainNet).toBe('string')
    expect(typeof responseJSON.value[0].createdAt).toBe('number')
  }, 10000)
})
