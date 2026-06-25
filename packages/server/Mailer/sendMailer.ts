import {
  MailDataRegInc,
  MailDataChangeStatus,
  IRegINCfromMail,
  ErrorSendMail,
} from './interface'
import { AppConst, mailConst } from '../data/const'
import { htmlRegistration, htmlChangeStatus } from '.'
import { SystemRepos } from '../db'
import { ISystem } from '../models/system'

const nodemailer = require('nodemailer')

export const mailerRegInc = async (data: MailDataRegInc) => {
  const { emailServer, incident } = (
    (await SystemRepos.findAll({})) as ISystem[]
  )[0]

  const { email, password, host, port } = emailServer
  if (!email || !password || !host || !port) {
    return { status: false, errText: AppConst.mailNotifications.errors.auth }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  })

  const message = {
    from: `"Уведомление службы поддержки SD" <${email}>`,
    to: `${incident.emailTechnicalSupport}, ${data.mailTo}`,
    subject: `${mailConst.mailMessages.Incidents.titleRegistration} ${data.incident}`,
    text: '',
    html: await htmlRegistration(data),
  }
  try {
    const info = await transporter.sendMail(message)
    return { status: true, info }
  } catch (err) {
    return { status: false, err: err as ErrorSendMail }
  }
}

export const mailerChangeStatus = async (data: MailDataChangeStatus) => {
  const { emailServer, incident } = (
    (await SystemRepos.findAll({})) as ISystem[]
  )[0]

  const { email, password, host, port } = emailServer
  if (!email || !password || !host || !port) {
    return { status: false, errText: AppConst.mailNotifications.errors.auth }
  }
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  })

  const message = {
    from: `"Уведомление службы поддержки SD" <${email}>`,
    to: `${incident.emailTechnicalSupport}, ${data.mailTo}`,
    subject: `${mailConst.mailMessages.Incidents.titleChangeStatus} ${data.incident}`,
    text: '',
    html: await htmlChangeStatus(data),
  }
  try {
    const info = await transporter.sendMail(message)
    return { status: true, info }
  } catch (err) {
    return { status: false, err: err as ErrorSendMail }
  }
}

export const sendMail = async ({
  addressTo,
  subject,
  text,
}: IRegINCfromMail) => {
  const { emailServer, incident } = (
    (await SystemRepos.findAll({})) as ISystem[]
  )[0]

  const { email, password, host, port } = emailServer
  if (!email || !password || !host || !port) {
    return { status: false, errText: AppConst.mailNotifications.errors.auth }
  }
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  })
  try {
    const info = await transporter.sendMail({
      from: `"Уведомление службы поддержки SD" <${email}>`,
      to: `${incident.emailTechnicalSupport}, ${addressTo}`,
      subject,
      text,
    })
    return { status: true, info }
  } catch (err) {
    return { status: false, err: err as ErrorSendMail }
  }
}
