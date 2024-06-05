export type User = {
  userID: string
  emailAdd: string
  githubAdd: string
  dataLimit: number
  dataUsed: number
  collectionCount: number
  tokenCount: number
  APIKeyCount: number
  marketingEmail: boolean
  accountRestricted: boolean
  termsAndCondition: boolean
  createdAt: number
  updatedAt: number
}

export type APIKey = {
  keyID: string
  keyHash: string
  keyName: string
  userID: string
  userRole: string
  createdAt: number
  updatedAt: number
  lastUsed: number
}

export type JWTPayload = {
  userID: string
  restricted: boolean
}
