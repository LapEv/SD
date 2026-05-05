import { MuiDiv, MuiSpan } from 'components/MUI'
import { IEditButtonsINC } from '../../interfaces'
import { Button } from 'components/Buttons'
import { useEffect, useState } from 'react'
import { checkFieldsError } from './checkFieldsError'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { timeIntervalData } from '../../data'
import { useIncidents } from 'hooks/incidents/useINC'
import { useAuth } from 'hooks/auth/useAuth'
import { createLogs } from './createLogs'

export const Buttons = ({
  inc,
  newINC,
  setNewINC,
  disabled,
  handleModal,
}: IEditButtonsINC) => {
  const [{ timeInterval }] = useTableINC()
  const [, { changeINC }] = useIncidents()
  const [{ user }] = useAuth()

  const [error, setError] = useState('')

  const saveData = () => {
    const _checkFields = checkFieldsError(newINC)
    const logs = createLogs(newINC, inc, user.id as string)
    setError(_checkFields)
    if (_checkFields) return
    const currentDate = new Date()
    const endDate = currentDate.setDate(
      currentDate.getDate() - (timeInterval ?? timeIntervalData[0].value),
    )
    const editINC = {
      id: newINC.id,
      act: newINC.act ?? [''],
      applicant: newINC.applicant ?? '',
      applicantContacts: newINC.applicantContacts ?? '',
      clientINC: newINC.clientINC ?? '',
      commentClose: newINC.commentClose ?? '',
      commentCloseCheck: newINC.commentCloseCheck ?? '',
      contract: newINC.contract,
      id_incContract: newINC.id_incContract as string,
      description: newINC.description ?? '',
      equipment: newINC.equipment,
      id_incEquipment: newINC.id_incEquipment as string,
      executor: newINC.executor,
      id_incExecutor: newINC.id_incExecutor as string,
      // files: newINC.files,
      model: newINC.model,
      id_incModel: newINC.id_incModel as string,
      responsible: newINC.responsible,
      id_incResponsible: newINC.id_incResponsible as string,
      sla: newINC.sla,
      id_incSLA: newINC.id_incSLA as string,
      typicalMalfunction: newINC.typicalMalfunction,
      id_incTypicalMalfunction: newINC.id_incTypicalMalfunction as string,
      typeCompletedWork: newINC.typeCompletedWork,
      id_typeCompletedWork: newINC.id_typeCompletedWork as string,
      typeOfWork: newINC.typeOfWork,
      id_typeOfWork: newINC.id_typeOfWork as string,
      relatedIncident: newINC.relatedIncident ?? '',
      parentalIncident: newINC.parentalIncident ?? '',
      spaceParts: newINC.spaceParts ?? [''],
      timeClose: newINC.timeClose ? new Date(newINC.timeClose) : null,
      timeCloseCheck: newINC.timeCloseCheck
        ? new Date(newINC.timeCloseCheck)
        : null,
      timeInWork: newINC.timeInWork ? new Date(newINC.timeInWork) : null,
      timeSLA: new Date(newINC.timeSLA),
      userClosing: newINC.userClosing ?? '',
      id_incClosing: newINC.id_incClosing,
      userClosingCheck: newINC.userClosingCheck ?? '',
      id_incClosingCheck: newINC.id_incClosingCheck,
    }
    changeINC({ editINC, endDate: new Date(endDate), logs })
    handleModal(false)
  }

  useEffect(() => {
    setError('')
  }, [newINC])

  return (
    <MuiDiv className="editDataButtonBox">
      <MuiSpan className="modalError">{error}</MuiSpan>
      <MuiDiv className="editButtonContainer">
        <MuiDiv>
          <Button
          // onClick={() =>
          //   newTask({ id: values.id, incident: values.incident })
          // }
          >
            Создать запрос
          </Button>
        </MuiDiv>
        <MuiDiv>
          <Button onClick={() => setNewINC(inc)}>Отменить изменения</Button>
          <Button onClick={() => handleModal(false)} sx={{ ml: 5 }}>
            Закрыть
          </Button>
          <Button onClick={saveData} disabled={disabled} sx={{ ml: 5 }}>
            Сохранить
          </Button>
        </MuiDiv>
      </MuiDiv>
    </MuiDiv>
  )
}
