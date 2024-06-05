import nodemailer from 'nodemailer'
import config from '../config/index.js'
import { emailSender } from '../config/constants.js'
import CustomError from '../middlewares/error/customError.js'

const mailService = nodemailer.createTransport({
  host: config.smtp_email_host,
  port: 587,
  auth: {
    user: config.smtp_email_id,
    pass: config.smtp_emai_password,
  },
})

export const sendEmail = async (to: string, subject: string, plainTextContent: string) => {
  try {
    const data = await mailService.sendMail({
      from: config.smtp_email_id,
      sender: emailSender,
      to,
      text: plainTextContent,
      subject: subject,
    })
    return data
  } catch (err) {
    throw new CustomError(500, 'Failed to send verification mail.')
  }
}
