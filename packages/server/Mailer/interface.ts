export interface MailDataRegInc {
  mailTo: string
  incident: string
  status: string
  clientINC: string
  timeRegistration: string
  timeSLA: string
  client: string
  legalName: string
  objectClientID: string
  objectClientName: string
  object: string
  address: string
  equipment: string
  model: string
  malfunction: string
  description: string
  applicant: string
  applicantContacts: string
  userAccepted: string
}

export interface MailDataChangeStatus {
  mailTo: string
  incident: string
  status: string
  clientINC: string
  timeChangeStatus: string
  timeSLA: string
  client: string
  legalName: string
  objectClientID: string
  objectClientName: string
  object: string
  address: string
  equipment: string
  model: string
  malfunction: string
  description: string
  typeCompletedWork: string
  commentCloseCheck: string
}
