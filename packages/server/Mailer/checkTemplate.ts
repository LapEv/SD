import { GetTamplateFromMail, GetTamplateFromSD } from './interface'
import { templates } from './TemplatesClient/templates'
import { incidentService } from '../services/incidentService'
import { sendMail } from './sendMailer'

export const checkTemplateFromMail = ({
  fromAddress,
  subjectText,
  mailText,
}: GetTamplateFromMail) => {
  templates.map(
    async ({
      nameTemplate,
      client,
      contract,
      addressFrom,
      subject,
      markINC,
      markObject,
      markComment,
      applicant,
      applicantContacts,
      addressTo,
      changeStatusText,
      codeInWork,
      incText,
    }) => {
      if (fromAddress === addressFrom && subjectText.includes(subject)) {
        if (nameTemplate === 'Dixy') {
          const arrText = mailText.split('\n')
          const clientINC = arrText
            .find(item => item.includes(markINC))
            ?.split(' ')[4]
            .trim() as string
          const object = arrText
            .find(item => item.includes(markObject))
            ?.split(':')[1]
            .trim() as string
          const comment = arrText
            .find(item => item.includes(markComment))
            ?.replace(markComment, '') as string
          const service = new incidentService()
          const result = await service.newINCfromMail({
            client,
            contract,
            clientINC,
            object,
            comment,
            applicant,
            applicantContacts,
          })
          const { numberINC } = result
          await sendMail({
            addressTo,
            subject: `${changeStatusText}${codeInWork} ${incText}${clientINC}`,
            text: `Внутренний номер ${numberINC}`,
          })
        }
      }
    },
  )
}

export const checkTemplateFromSD = ({
  newStatus,
  client,
  contract,
  clientINC,
  commentCloseCheck,
}: GetTamplateFromSD) => {
  templates.map(item => {
    if (item.client === client && item.contract === contract) {
      if (item.nameTemplate === 'Dixy') {
        if (newStatus === 'Решён') {
          sendMail({
            addressTo: item.addressTo,
            subject: `${item.changeStatusText}${item.codeResolved} ${item.incText}${clientINC}`,
            text: `Выполнено, ${commentCloseCheck}`,
          })
        }
      }
    }
  })
}
