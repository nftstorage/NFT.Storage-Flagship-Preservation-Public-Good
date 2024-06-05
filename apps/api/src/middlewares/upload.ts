import multer from 'multer'
import { Request } from 'express'
import { FileFilterCallback } from 'multer'
import { CSVFileSizeLimit } from '../config/constants.js'

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'text/csv' || file.mimetype === 'application/json') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: CSVFileSizeLimit },
  fileFilter: fileFilter,
})

export default upload
