export type Collection = {
  collectionID: string
  userID: string
  collectionName: string
  contractAddress: string
  chainID: string
  blockchainNet: string
  tokenCount: number
  createdAt: number
  updatedAt: number
}

export type Token = {
  id: string
  tokenID: string
  cid: string
  fileSize: number
  dealStatus: string
  collectionID: string
  userID: string
  createdAt: number
  updatedAt: number
}

export type RetryLog = {
  userID: string
  retryStatus: string
  retryCount: number
  successCount: number
  failedCount: number
  createdAt: number
  updatedAt: number
}

export enum TokenStatus {
  Started = 'started',
  PinningFailed = 'pinning-failed',
  Retry = 'retry',
  InQueue = 'in-queue',
  DataCapExceed = 'data-cap-exceed',
  Complete = 'complete',
  Duplicate = 'duplicate',
}

export type TokenObject = {
  tokenID: string
  cid: string
}

export enum RetryStatus {
  Started = 'started',
  Done = 'done',
}

export enum LighthouseCIDStatus {
  Queued = 'queued',
  PinningStarted = 'pinning-started',
  PinningFailed = 'pinning-failed',
  Pinned = 'pinned',
  UserDeleted = 'user-deleted',
  DealMakingStarted = 'deal-making-started',
  Complete = 'complete',
}
