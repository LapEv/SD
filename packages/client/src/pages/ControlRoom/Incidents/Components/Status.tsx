import React, { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownIncidents, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IModal, IStatus, IStatusTemp } from './interfaces'
import { ModalTitles, customDropDownCell, emptyStatusTemp } from '../data'
import { useMessage } from 'hooks/message/useMessage'
import { Modal } from '@mui/material'
import { ChangeStatus } from '../Modals'
import { DataCloseINC } from '../Modals/interfaces'
import { useFiles } from 'hooks/files/useFiles'
import { FilterOptions } from '../Utils/FilterOptions'

export const Status = memo(
  ({ value, id, incident, currentStatus, timeSLA, changeINC }: IStatus) => {
    const [, { setMessage }] = useMessage()
    const modalClientRef = React.createRef()
    const [modal, setModal] = useState<IModal>({
      status: false,
      data: emptyValue,
      modalName: '',
    })
    const [{ user }] = useAuth()
    const [{ uploadedFiles }, { uploadFiles, resetUploadFiles }] = useFiles()
    const [{ incStatuses, incidents }, { changeStatus }] = useIncidents()

    const [status, setStatus] = useState<Options>({
      label: value,
      id: '',
    })
    const [cashData, setCashData] = useState<IStatusTemp>(emptyStatusTemp)

    const setData = (data: Options) => {
      const newStatus = incStatuses.findIndex(item => item.id === data.id)
      const oldStatus = incStatuses.findIndex(
        item => item.statusINC === currentStatus,
      )
      if (oldStatus === 0) {
        if (newStatus > 1) {
          const statusText = incStatuses.find(
            item => item.stateNumber === newStatus + 1,
          )
          setMessage({
            text: `Нельзя перевести в статус ${statusText?.statusINC}! Кликните два раза `,
            type: 'warning',
          })
          return
        }
        if (newStatus === 1) {
          changeINC({ id, incident, incidents })
          return
        }
      }
      if (newStatus < 0) {
        setMessage({
          text: `Необходимо выбрать статус!`,
          type: 'warning',
        })
        setStatus({ id: '', label: currentStatus })
        return
      }
      if (newStatus <= oldStatus && newStatus === 0) {
        setStatus({ id: '', label: currentStatus })
        if (newStatus === oldStatus) return
        setMessage({
          text: `Нельзя перевести в статус "${data.label}"!`,
          type: 'warning',
        })
        return
      }

      if (newStatus <= oldStatus && oldStatus === incStatuses.length - 1) {
        setStatus({ id: '', label: currentStatus })
        if (newStatus === oldStatus) return
        setMessage({
          text: `Нельзя изменить статус "${incStatuses[incStatuses.length - 1].statusINC}"!`,
          type: 'warning',
        })
        return
      }

      if (
        newStatus === incStatuses.length - 1 &&
        oldStatus < incStatuses.length - 2
      ) {
        setStatus({ id: '', label: currentStatus })
        if (newStatus === oldStatus) return
        setMessage({
          text: `Нельзя перевести в статус "${incStatuses[incStatuses.length - 1].statusINC}" без статуса "${incStatuses[incStatuses.length - 2].statusINC}"!`,
          type: 'warning',
        })
        return
      }

      const modalDop = incStatuses.find(({ id }) => id === data.id)?.modal
      if (modalDop && modalDop === 'closeINC') {
        setModal({ status: true, data, modalName: 'closeINC' })
        return
      }
      setStatus(data)
      const { nameSort, direction, limit, page, filterOptions } =
        FilterOptions()
      changeStatus({
        id,
        id_incStatus: data.id as string,
        incident,
        status: data.label,
        userID: user.id as string,
        timeSLA,
        nameSort,
        direction,
        limit,
        page,
        filterOptions,
      })
    }

    const handleModal = ({
      state,
      typeCompletedWork,
      commentCloseCheck,
      files,
      spaceParts,
      data,
    }: DataCloseINC) => {
      console.log('commentCloseCheck = ', commentCloseCheck)
      console.log('typeCompletedWork = ', typeCompletedWork)
      if (!state) {
        setModal({ status: false, data: emptyValue })
        return
      }
      if (files) {
        setCashData({
          data,
          id,
          id_incStatus: data.id as string,
          incident,
          status: data.label,
          userID: user.id as string,
          timeSLA,
          typeCompletedWork: typeCompletedWork as Options,
          commentCloseCheck: commentCloseCheck as string,
          spaceParts: spaceParts as string[],
        })
        uploadFiles({
          id_incFiles: id,
          files: files as FileList,
          incident,
        })
        return
      }
      setStatus(data)
      const { nameSort, direction, limit, page, filterOptions } =
        FilterOptions()
      changeStatus({
        id,
        id_incStatus: data.id as string,
        incident,
        status: data.label,
        userID: user.id as string,
        timeSLA,
        typeCompletedWork,
        commentCloseCheck,
        spaceParts,
        nameSort,
        direction,
        limit,
        page,
        filterOptions,
      })
      setModal({ status: false, data: emptyValue })
    }

    useEffect(() => {
      if (uploadedFiles && uploadedFiles.length > 0 && id === cashData.id) {
        const {
          data,
          id,
          id_incStatus,
          incident,
          status,
          userID,
          timeSLA,
          typeCompletedWork,
          commentCloseCheck,
          spaceParts,
        } = cashData
        const { nameSort, direction, limit, page, filterOptions } =
          FilterOptions()
        setStatus(data)
        changeStatus({
          id,
          id_incStatus,
          incident,
          status,
          userID,
          timeSLA,
          typeCompletedWork,
          commentCloseCheck,
          spaceParts,
          nameSort,
          direction,
          limit,
          page,
          filterOptions,
        })
        setModal({ status: false, data: emptyValue })
        resetUploadFiles()
      }
    }, [uploadedFiles])

    useEffect(() => {
      setStatus({ label: value, id: '' })
    }, [value])

    return (
      <>
        <Modal
          open={modal.status}
          onClose={() => setModal({ status: false, data: emptyValue })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          {modal.modalName === 'closeINC' ? (
            <ChangeStatus
              ref={modalClientRef}
              handleModal={handleModal}
              title={ModalTitles.closeINC}
              data={modal.data}
            />
          ) : (
            <></>
          )}
        </Modal>
        <DropDownIncidents
          data={incStatuses.map(({ statusINC, id }) => {
            return {
              ['label']: statusINC,
              ['id']: id as string,
            }
          })}
          props={customDropDownCell}
          textProps={{ fontSize: '0.775rem' }}
          onChange={setData}
          value={status.label}
          label="Выберите статус"
          errorLabel="Не выбран статус!"
          disableClearable={true}
        />
      </>
    )
  },
)
