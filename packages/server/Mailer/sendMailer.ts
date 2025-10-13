import {
  MailDataRegInc,
  MailDataChangeStatus,
  IRegINCfromMail,
} from './interface'
import { mailConst } from '../data/const'
import { htmlRegistration, htmlChangeStatus } from '.'

const nodemailer = require('nodemailer')

export const mailerRegInc = async (data: MailDataRegInc) => {
  const { EMAIL_USER_SD, EMAIL_PASSWORD_SD, EMAIL_HOST_SD, EMAIL_PORT_SD } =
    process.env
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST_SD,
    port: EMAIL_PORT_SD,
    secure: true,
    auth: {
      user: EMAIL_USER_SD,
      pass: EMAIL_PASSWORD_SD,
    },
  })
  const info = await transporter.sendMail({
    from: `"Уведомление службы поддержки СБИ" <${EMAIL_USER_SD}>`,
    to: `${mailConst.ourMail}, ${data.mailTo}`,
    subject: `${mailConst.mailMessages.Incidents.titleRegistration} ${data.incident}`,
    text: '',
    html: htmlRegistration(data),
  })
  return info
}

export const mailerChangeStatus = async (data: MailDataChangeStatus) => {
  const { EMAIL_USER_SD, EMAIL_PASSWORD_SD, EMAIL_HOST_SD, EMAIL_PORT_SD } =
    process.env
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST_SD,
    port: EMAIL_PORT_SD,
    secure: true,
    auth: {
      user: EMAIL_USER_SD,
      pass: EMAIL_PASSWORD_SD,
    },
  })
  const info = await transporter.sendMail({
    from: `"Уведомление службы поддержки СБИ" <${EMAIL_USER_SD}>`,
    to: `${mailConst.ourMail}, ${data.mailTo}`,
    subject: `${mailConst.mailMessages.Incidents.titleChangeStatus} ${data.incident}`,
    text: '',
    html: htmlChangeStatus(data),
  })
  return info
}

export const sendMail = async ({
  addressTo,
  subject,
  text,
}: IRegINCfromMail) => {
  const { EMAIL_USER_SD, EMAIL_PASSWORD_SD, EMAIL_HOST_SD, EMAIL_PORT_SD } =
    process.env
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST_SD,
    port: EMAIL_PORT_SD,
    secure: true,
    auth: {
      user: EMAIL_USER_SD,
      pass: EMAIL_PASSWORD_SD,
    },
  })
  const info = await transporter.sendMail({
    from: `"Уведомление службы поддержки СБИ" <${EMAIL_USER_SD}>`,
    to: `${mailConst.ourMail}, ${addressTo}`,
    subject,
    text,
  })
  console.log('info = ', info)
  return info
}
