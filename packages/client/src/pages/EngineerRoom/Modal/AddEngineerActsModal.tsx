import React from 'react'
import { Modal } from '@mui/material'
import { useFiles } from 'hooks/files/useFiles'
import { useAuth } from 'hooks/auth/useAuth'
import { INC } from 'store/slices/incidents/interfaces'
import { FilesData } from 'store/slices/files/interfaces'
import { DataAddAct } from '../interfaces'
import { AddEngineerAct } from '../Components/AddEngineerAct'
import { timeEngineerIntervalData } from '../data'
import { createLogs } from '../Utils/createLogs'
import { useEngineer } from 'hooks/engineer/useEngineer'

export interface IAddEngineerActsModal {
  inc: INC
}

export const AddEngineerActsModal = () => {
  const [{ addAct, viewFiles }, { setAddAct, setViewFiles }] = useFiles()
  const [{ timeInterval }, { changeINCAddEngineerFiles }] = useEngineer()
  const [{ user }] = useAuth()

  const modalClientRef = React.createRef()

  const handleModalAddAct = ({ state, files, act }: DataAddAct) => {
    if (!state) {
      setAddAct({ status: false, id_incFiles: '' })
      return
    }
    if (files?.length) {
      const inc = addAct.inc as INC
      const _newINC = {
        ...inc,
        act: [...inc.act, ...(act as string[])],
        files,
        Files: files,
      }
      const logs = createLogs(_newINC, inc as INC, user.id as string)
      const currentDate = new Date()
      const endDate = currentDate.setDate(
        currentDate.getDate() -
          (timeInterval ?? timeEngineerIntervalData[0].value),
      )
      changeINCAddEngineerFiles({
        endDate: timeInterval === 0 ? 0 : new Date(endDate),
        logs,
        id: _newINC.id,
        userId: user.id as string,
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
        <AddEngineerAct
          ref={modalClientRef}
          handleModalAddAct={handleModalAddAct}
          title={'Добавить акты'}
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
