import React from 'react'
import { Modal } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { INC } from 'store/slices/incidents/interfaces'
import { DataCloseEngineerINC } from '../interfaces'
import { useEngineer } from 'hooks/engineer/useEngineer'
import { CloseEngineerINC } from '../Components/CloseEngineerINC'
import { useIncidents } from 'hooks/incidents/useINC'

export interface ICloseEngineerINCModal {
  openCloseINCModal: boolean
  setOpenCloseINCModal: (data: boolean) => void
  inc: INC
}

export const CloseEngineerINCModal = ({
  openCloseINCModal,
  setOpenCloseINCModal,
  inc,
}: ICloseEngineerINCModal) => {
  const [{ incStatuses }] = useIncidents()
  const [, { changeStatusDone }] = useEngineer()
  const [{ user }] = useAuth()

  const modalClientRef = React.createRef()

  const handleModal = ({
    state,
    typeCompletedWork,
    commentCloseCheck,
    files,
    spaceParts,
    act,
  }: DataCloseEngineerINC) => {
    if (!state) {
      setOpenCloseINCModal(false)
      return
    }
    const currentDate = new Date().toISOString()
    const log = {
      User: { id: user.id!, shortName: user.shortName! },
      log: {
        id_incLog: inc.id,
        time: currentDate,
        log: `Для инцидента под номером ${inc.incident} изменен статус "Выполнено". Тип решения: ${typeCompletedWork?.label ?? ''}. Комментарий: ${commentCloseCheck ?? ''}. ЗИП: ${spaceParts ?? ''}`,
        id_incLogUser: user.id!,
      },
    }
    const statusDone = incStatuses.find(
      ({ statusINC }) => statusINC === 'Выполнено',
    )
    if (files?.length) {
      changeStatusDone({
        id: inc.id,
        incident: inc.incident,
        typeCompletedWork: typeCompletedWork?.label,
        id_typeCompletedWork: typeCompletedWork?.id,
        commentCloseCheck,
        spaceParts,
        files,
        Files: files,
        act,
        timeDone: currentDate,
        id_incDone: user.id!,
        userDone: user.shortName,
        id_incStatus: statusDone?.id,
        status: statusDone?.statusINC,
        log,
      })
      setOpenCloseINCModal(false)

      return
    }

    changeStatusDone({
      id: inc.id,
      incident: inc.incident,
      typeCompletedWork: typeCompletedWork?.label,
      id_typeCompletedWork: typeCompletedWork?.id,
      commentCloseCheck,
      spaceParts,
      timeDone: currentDate,
      id_incDone: user.id!,
      userDone: user.shortName,
      id_incStatus: statusDone?.id,
      status: statusDone?.statusINC,
      log,
    })
    setOpenCloseINCModal(false)
  }

  return (
    <Modal
      open={openCloseINCModal}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      {openCloseINCModal ? (
        <CloseEngineerINC
          ref={modalClientRef}
          handleModal={handleModal}
          title={'Выполнение инцидента'}
          incident={inc.incident as string}
          id_incFiles={inc.id as string}
        />
      ) : (
        <></>
      )}
    </Modal>
  )
}
