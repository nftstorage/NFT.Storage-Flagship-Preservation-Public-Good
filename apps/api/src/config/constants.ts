const service = 'nft.storage'
const emailSender = 'nft.storage'

const jwtAlgo = 'HS256'
const jwtExpire = '1d'

const usersTable = 'users'
const authTable = 'auth'
const collectionTable = 'collection'
const tokenTable = 'token'
const transactionTable = 'transactions'
const pageSizeToken = 500

const pricePerGBInDollar = 2.99
const CSVFileSizeLimit = 2 * 1024 * 1024
const cacheClearTime = {
  day: 86400,
  week: 604800,
  month: 2628000,
}

const lighthouseAPIURL = 'https://api.lighthouse.storage'
const filecoinFirstURL = 'https://filecoin-first.lighthouse.storage'

export {
  service,
  emailSender,
  jwtAlgo,
  jwtExpire,
  usersTable,
  authTable,
  collectionTable,
  tokenTable,
  transactionTable,
  pageSizeToken,
  pricePerGBInDollar,
  CSVFileSizeLimit,
  cacheClearTime,
  lighthouseAPIURL,
  filecoinFirstURL,
}
