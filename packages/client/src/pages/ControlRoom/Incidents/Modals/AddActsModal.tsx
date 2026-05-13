import React from 'react'
import { Modal } from '@mui/material'
import { AddAct } from '../components/Edit/AddAct'
import { DataAddAct } from '../interfaces'
import { useFiles } from 'hooks/files/useFiles'
import { useIncidents } from 'hooks/incidents/useINC'
import { useAuth } from 'hooks/auth/useAuth'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { INC } from 'store/slices/incidents/interfaces'
import { FilesData } from 'store/slices/files/interfaces'
import { createLogs } from '../components/Edit/createLogs'
import { ModalTitles, timeIntervalData } from '../data'

export interface IAddActsModal {
  inc: INC | undefined
  newINC: INC
  setNewINC: (data: INC) => void
}

export const AddActsModal = ({ inc, newINC, setNewINC }: IAddActsModal) => {
  const [{ addAct, viewFiles }, { setAddAct, setViewFiles }] = useFiles()
  const [, { changeINCAddFiles }] = useIncidents()
  const [{ user }] = useAuth()
  const [{ timeInterval }] = useTableINC()

  const modalClientRef = React.createRef()

  const handleModalAddAct = ({ state, files, act }: DataAddAct) => {
    if (!state) {
      setAddAct({ status: false, id_incFiles: '' })
      return
    }
    if (files?.length) {
      const _newINC = {
        ...newINC,
        act: [...newINC.act, ...(act as string[])],
        files,
        Files: files,
      }
      setNewINC(_newINC)
      const logs = createLogs(_newINC, inc as INC, user.id as string)
      const currentDate = new Date()
      const endDate = currentDate.setDate(
        currentDate.getDate() - (timeInterval ?? timeIntervalData[0].value),
      )
      changeINCAddFiles({
        endDate: timeInterval === 0 ? 0 : new Date(endDate),
        logs,
      })
      setAddAct({ status: false, id_incFiles: '' })

      const newViewFile = { ...(viewFiles.files as FilesData[]), files }
      setViewFiles({ idINC: viewFiles.idINC, files: newViewFile })
      return
    }
  }

  return (
    <Modal
      open={addAct.status}
      onClose={handleModalAddAct}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      {addAct ? (
        <AddAct
          ref={modalClientRef}
          handleModalAddAct={handleModalAddAct}
          title={ModalTitles.addActs}
          incident={addAct.incident as string}
          id_incFiles={addAct.id_incFiles as string}
          files={addAct.files}
        />
      ) : (
        <></>
      )}
    </Modal>
  )
}
