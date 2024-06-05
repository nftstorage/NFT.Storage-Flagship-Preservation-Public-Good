import { Redis } from 'ioredis'
import config from '../../config/index.js'
import logger from '../../utils/logger.js'

const client = new Redis(config.redis_url)

client.on('error', (err: any) => {
  if (err.code === 'ECONNREFUSED') {
    logger.error('Redis connection refused.')
    client.quit()
  } else {
    logger.error('Redis error:', err)
  }
})

export const setCache = async (key: string, value: any) => {
  return await client.set(key, JSON.stringify(value))
}

export const setExCache = async (key: string, seconds: number, value: any) => {
  return await client.setex(key, seconds, JSON.stringify(value))
}

export const getCache = async (key: string) => {
  if (client.status === 'ready') {
    return await client
      .get(key)
      .then((result: any) => {
        return JSON.parse(result)
      })
      .catch((err) => {
        console.error(err)
        return null
      })
  }
  return null
}

export const removeCache = async (key: any) => {
  if (client.status === 'ready') {
    return await client
      .del(key)
      .then((result: any) => {
        return result
      })
      .catch(() => {
        return null
      })
  }
  return null
}

export const cacheFunction = async (fn: any, key: string, seconds: number) => {
  if (client.status === 'ready') {
    const data = await getCache(key)
    if (data) {
      return data
    }
  }
  const data = await fn()
  if (client.status === 'ready') {
    await setExCache(key, seconds, data)
  }
  return data
}
