import jwt from 'jsonwebtoken'

export const verifyJWT = (accessToken: string, secret: string) => {
  try {
    const userData = jwt.verify(accessToken, secret)
    return userData
  } catch {
    return null
  }
}
