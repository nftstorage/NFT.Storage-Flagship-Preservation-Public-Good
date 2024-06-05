import request from 'supertest'
import app from '../../app.js'

describe('Collection', () => {
  it('should create a new collection on POST /create_collection', async () => {
    const data = {
      collectionName: 'test_collection',
      contractAddress: '0x7afb17668fc0ef182901c4522a6e3e6df9f3bdca8e3df2d422e9ab30aa2e4478',
      chainID: '1',
      network: 'Ethereum',
    }

    const response = await request(app)
      .post('/api/v1/collection/create_collection')
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)
      .send(data)

    expect(response.status).toBe(200)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(true)
    expect(responseJSON.value.message).toBe('Collection created.')
    expect(typeof responseJSON.value.collectionID).toBe('string')
  }, 10000)
})
