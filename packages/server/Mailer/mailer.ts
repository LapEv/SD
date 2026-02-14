import { MailDataRegInc, MailDataChangeStatus } from './interface'
import { mailConst } from '../data/const'
import { htmlRegistration, htmlChangeStatus } from '.'

const nodemailer = require('nodemailer')

export const mailerRegInc = async (data: MailDataRegInc) => {
  const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  })
  const info = await transporter.sendMail({
    from: `"Уведомление службы поддержки СБИ" <${EMAIL_USER}>`,
    to: `${mailConst.ourMail}, ${data.mailTo}`,
    subject: `${mailConst.mailMessages.Incidents.titleRegistration} ${data.incident}`,
    text: '',
    html: htmlRegistration(data),
  })
  return info
}

export const mailerChangeStatus = async (data: MailDataChangeStatus) => {
  const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  })
  const info = await transporter.sendMail({
    from: `"Уведомление службы поддержки СБИ" <${EMAIL_USER}>`,
    to: `${mailConst.ourMail}, ${data.mailTo}`,
    subject: `${mailConst.mailMessages.Incidents.titleChangeStatus} ${data.incident}`,
    text: '',
    html: htmlChangeStatus(data),
  })
  return info
}
