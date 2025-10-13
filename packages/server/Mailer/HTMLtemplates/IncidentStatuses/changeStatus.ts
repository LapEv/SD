import { mailConst } from '../../../data/const'
import { MailDataChangeStatus } from '/Mailer/interface'

export const htmlChangeStatus = ({
  incident,
  status,
  clientINC,
  timeChangeStatus,
  timeSLA,
  client,
  legalName,
  object,
  objectClientID,
  objectClientName,
  address,
  equipment,
  model,
  malfunction,
  description,
  typeCompletedWork,
  commentCloseCheck,
}: MailDataChangeStatus) => {
  const message = `
  <html>

  <head>
    <base target="_top">
  </head>
  
  <body>
    <div
      style="width: auto; height: auto; padding: 10px; font-size: 11px; font-weight: 100;font-family: 'Calibri', sans-serif;color: #000000;">
      <div style="display: flex; font-size: 14px; font-weight: 700;">
        ${mailConst.mailMessages.Incidents.changeStatus1} ${incident} ${
          mailConst.mailMessages.Incidents.changeStatus2
        } ${status}
      </div>
      <div style="margin-top: 10px; font-size: 13px">
      <b>${mailConst.mailMessages.Incidents.client}</b> ${client}<br>
      <b>${mailConst.mailMessages.Incidents.legalName}</b> ${legalName}<br>
      ${
        clientINC
          ? `<b>${mailConst.mailMessages.Incidents.clientINC}</b> ${clientINC}<br>`
          : ``
      }
        <b>${
          mailConst.mailMessages.Incidents.timeChangeStatus
        }</b> ${timeChangeStatus}<br>
        <b>${mailConst.mailMessages.Incidents.timeSLA}</b> ${timeSLA}<br>
        <b>${mailConst.mailMessages.Incidents.object}</b> ${object}<br>
        <b>${mailConst.mailMessages.Incidents.address}</b> ${address}<br>
        ${
          objectClientID
            ? `<b>${mailConst.mailMessages.Incidents.objectClientID}</b> ${objectClientID}<br>`
            : ``
        }
        ${
          objectClientName
            ? `<b>${mailConst.mailMessages.Incidents.objectClientName}</b> ${objectClientName}<br>`
            : ``
        }
        <b>${mailConst.mailMessages.Incidents.equipment}</b> ${equipment}<br>
        <b>${mailConst.mailMessages.Incidents.model}</b> ${model}<br>
        <b>${
          mailConst.mailMessages.Incidents.malfunction
        }</b> ${malfunction}<br>
        <b>${
          mailConst.mailMessages.Incidents.description
        }</b> ${description}<br>
        ${
          typeCompletedWork
            ? `<b>${mailConst.mailMessages.Incidents.typeCompletedWork}</b> ${typeCompletedWork}<br>`
            : ``
        }
        ${
          commentCloseCheck
            ? `<b>${mailConst.mailMessages.Incidents.commentCloseCheck}</b> ${commentCloseCheck}<br>`
            : ``
        }
      </div>
      <div style="margin-top: 10px; font-size: 9px">
      ========================
      <br>
      <br>
        Это письмо сформировано автоматически, отвечать на него не нужно. Если Вы получили это сообщение по ошибке,
        пожалуйста, сообщите об этом на адрес ${
          mailConst.ourMail
        } и удалите это сообщение.
      </div>
    </div>
  </body>
  
  </html>`
  return message
}
