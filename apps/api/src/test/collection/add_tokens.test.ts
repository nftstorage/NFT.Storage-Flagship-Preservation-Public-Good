import path from 'path'
import { fileURLToPath } from 'url'
import request from 'supertest'
import app from '../../app.js'

describe('Tokens', () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  it('should save tokens from CSV POST /add_tokens', async () => {
    const response = await request(app)
      .post('/api/v1/collection/add_tokens')
      .field('collectionID', '5ce45f07-f225-42f6-a599-b9e3d7a531fe')
      .attach('file', path.resolve(__dirname, 'tokens_valid.csv'))
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)

    expect(response.status).toBe(200)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(true)
    expect(responseJSON.value).toBe('2 tokens added.')
  }, 10000)

  it('should save tokens partially from CSV POST /add_tokens', async () => {
    const response = await request(app)
      .post('/api/v1/collection/add_tokens')
      .field('collectionID', '5ce45f07-f225-42f6-a599-b9e3d7a531fe')
      .attach('file', path.resolve(__dirname, 'tokens_invalid.csv'))
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)

    expect(response.status).toBe(400)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(false)
    expect(responseJSON.error.code).toBe(400)
    expect(responseJSON.error.message).toBe('1 tokens rejected due to invalid CID or tokenID.')
  }, 10000)

  it('should save tokens from JSON POST /add_tokens', async () => {
    const response = await request(app)
      .post('/api/v1/collection/add_tokens')
      .field('collectionID', '5ce45f07-f225-42f6-a599-b9e3d7a531fe')
      .attach('file', path.resolve(__dirname, 'tokens_valid.json'))
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)

    expect(response.status).toBe(200)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(true)
    expect(responseJSON.value).toBe('1 tokens added.')
  }, 10000)

  it('should save tokens partially from JSON POST /add_tokens', async () => {
    const response = await request(app)
      .post('/api/v1/collection/add_tokens')
      .field('collectionID', '5ce45f07-f225-42f6-a599-b9e3d7a531fe')
      .attach('file', path.resolve(__dirname, 'tokens_invalid.json'))
      .set('Authorization', `Bearer ${process.env.TEST_API_KEY}`)

    expect(response.status).toBe(400)
    const responseJSON = JSON.parse(response.text)
    expect(responseJSON.ok).toBe(false)
    expect(responseJSON.error.code).toBe(400)
    expect(responseJSON.error.message).toBe('1 tokens rejected due to invalid CID or tokenID.')
  }, 10000)
})
