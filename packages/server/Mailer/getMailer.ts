import { MessageFunctions, ImapMessageAttributes } from 'imap'
import Connection = require('imap')
const Imap = require('imap')
const { simpleParser } = require('mailparser')
import { ParsedMail } from 'mailparser'
import { checkTemplateFromMail } from './checkTemplate'

const { EMAIL_USER_SD, EMAIL_PASSWORD_SD, EMAIL_HOST_SD } = process.env

const imapConfig = {
  user: EMAIL_USER_SD,
  password: EMAIL_PASSWORD_SD,
  host: EMAIL_HOST_SD,
  port: 993,
  tls: true,
}

export const getEmails = () => {
  try {
    const imap = new Imap(imapConfig)
    imap.connect()
    imap.on('ready', () => {
      imap.openBox('INBOX', false, () => {
        imap.search(
          ['UNSEEN', ['SINCE', new Date()]],
          (err: Error, results: []) => {
            if (err) throw err
            else if (!results || !results.length) {
              console.log(
                "The server didn't find any emails matching the specified criteria",
              )
            } else {
              const f = imap.fetch(results, { bodies: '' })
              f.on('message', (msg: Connection) => {
                msg.on('body', (stream: Connection) => {
                  simpleParser(
                    stream,
                    async (err: Error, parsed: ParsedMail) => {
                      if (err) {
                        console.log('err imap simpleParser = ', err)
                      }
                      const { from, subject, text } = parsed
                      const fromAddress = from?.value[0].address as string
                      const subjectText = subject as string
                      const mailText = text as string
                      checkTemplateFromMail({
                        fromAddress,
                        subjectText,
                        mailText,
                      })
                      // console.log(parsed)
                      // console.log('from = ', from)
                      // console.log('subject = ', subject)
                      // console.log('textAsHtml = ', textAsHtml)
                      // console.log('text = ', text)
                      /* Make API call to save the data
                   Save the retrieved data into a database.
                   E.t.c
                */
                    },
                  )
                })
                msg.once('attributes', (attrs: ImapMessageAttributes) => {
                  const { uid } = attrs
                  imap.addFlags(uid, ['\\Seen'], () => {
                    console.log('Marked as read!')
                  })
                })
              })

              f.once('error', (ex: MessageFunctions) => {
                return Promise.reject(ex)
              })
              f.once('end', () => {
                imap.end()
              })
            }
          },
        )
      })
    })

    imap.once('error', (err: Error) => {
      console.log('IMAP error = ', err)
      console.log('IMAP error date = ', new Date())
    })

    imap.once('end', () => {
      console.log('IMAP Connection ended')
    })
  } catch (ex) {
    console.log('IMAP an error occurred')
  }
}
