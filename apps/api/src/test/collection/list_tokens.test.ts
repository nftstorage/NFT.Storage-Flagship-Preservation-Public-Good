import request from 'supertest'
import app from '../../app.js'

describe('Collection', () => {
  it('should return collection list" on GET /list_tokens', async () => {
    const response = await request(app)
      .get('/api/v1/collection/list_tokens?collectionID=5ce45f07-f225-42f6-a599-b9e3d7a531fe')
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)

    expect(response.status).toBe(200)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(true)

    expect(typeof responseJSON.value[0].id).toBe('string')
    expect(typeof responseJSON.value[0].tokenID).toBe('string')
    expect(typeof responseJSON.value[0].cid).toBe('string')
    expect(typeof responseJSON.value[0].fileSize).toBe('number')
    expect(typeof responseJSON.value[0].dealStatus).toBe('string')
    expect(typeof responseJSON.value[0].createdAt).toBe('number')
  }, 10000)
})
