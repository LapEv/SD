import React, { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownINConTable, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { useMessage } from 'hooks/message/useMessage'
import { Modal } from '@mui/material'
import { ModalTitles, logs } from '../../data'
import { ChangeStatus } from '../../Modals/ChangeStatus'
import { IStatus, IModalStatus, DataCloseINC } from '../../interfaces'
import { INCStatuses } from 'store/slices/incidents/interfaces'

export const Status = memo(
  ({ value, id, incident, timeSLA, executor, responsible }: IStatus) => {
    const [, { setMessage }] = useMessage()
    const modalClientRef = React.createRef()
    const [modal, setModal] = useState<IModalStatus>({
      status: false,
      data: emptyOptionsDD,
      modalName: '',
    })
    const [{ user }] = useAuth()
    const [{ incStatuses }, { changeStatus, checkForCloseINC }] = useIncidents()
    const [status, setStatus] = useState<Options>({ label: value, id: '' })

    const setData = (data: Options) => {
      const newStatus = incStatuses.find(
        item => item.id === data.id,
      ) as INCStatuses
      const oldStatus = incStatuses.find(
        item => item.id === status.id,
      ) as INCStatuses
      if (oldStatus.stateNumber === newStatus.stateNumber) return
      const currentDate = new Date().toISOString()
      const log = {
        User: { id: user.id!, shortName: user.shortName! },
        log: {
          id_incLog: id,
          time: currentDate,
          log: `${logs.actionComment.changeStatus.first}${incident}${logs.actionComment.changeStatus.second}${newStatus.statusINC}`,
          id_incLogUser: user.id!,
        },
      }
      if (oldStatus.stateNumber === 1) {
        if (newStatus.stateNumber > 2) {
          setMessage({
            text: `Нельзя перевести в статус выше, чем "${incStatuses[1].statusINC}"! `,
            type: 'warning',
          })
          return
        }
        changeStatus({
          id,
          _incident: incident,
          id_incStatus: newStatus.id,
          status: newStatus.statusINC,
          id_incUser: user.id!,
          userAccepted: user.shortName,
          timeRegistration: currentDate,
          log,
        })
      }
      if (oldStatus.statusINC === 'Зарегистрирован') {
        if (newStatus.stateNumber === 1) {
          setMessage({
            text: `Нельзя перевести в статус ниже, чем "${incStatuses[1].statusINC}"! `,
            type: 'warning',
          })
          return
        }
        if (newStatus.statusINC !== 'В работе') {
          setMessage({
            text: `Нельзя перевести в статус выше, чем "${incStatuses[2].statusINC}"! `,
            type: 'warning',
          })
          return
        }
        if (executor === '') {
          setMessage({
            text: `Не выбран исполнитель! Выберите исполнителя!`,
            type: 'warning',
          })
          return
        }
        if (responsible === '') {
          setMessage({
            text: `Не выбран ответственный! Выберите ответственного!`,
            type: 'warning',
          })
          return
        }
        changeStatus({
          id,
          _incident: incident,
          id_incStatus: newStatus.id,
          status: newStatus.statusINC,
          id_incResponsible: user.id!,
          responsible: user.shortName,
          timeInWork: currentDate,
          timeSLA,
          log,
        })
      }
      if (oldStatus.statusINC === 'В работе') {
        if (
          newStatus.statusINC === 'Зарегистрирован' ||
          newStatus.statusINC === 'Закрыт' ||
          newStatus.statusINC === 'Новая'
        ) {
          setMessage({
            text: `Нельзя назначить статус "${newStatus.statusINC}"! `,
            type: 'warning',
          })
          return
        }
        if (newStatus.statusINC === 'Ожидание ЗИП/оборудования') {
          changeStatus({
            id,
            _incident: incident,
            id_incStatus: newStatus.id,
            status: newStatus.statusINC,
            timeSLA,
            log,
          })
        }
        if (newStatus.statusINC === 'Решён') {
          if (executor === '') {
            setMessage({
              text: `Нельзя перевести в статус "Решён" без исполнителя! Выберите исполнителя!`,
              type: 'warning',
            })
            return
          }
          if (responsible === '') {
            setMessage({
              text: `Нельзя перевести в статус "Решён" без ответственного! Выберите ответственного!`,
              type: 'warning',
            })
            return
          }

          const modalDop = incStatuses.find(({ id }) => id === data.id)?.modal
          if (modalDop && modalDop === 'closeINC') {
            setModal({
              status: true,
              data,
              modalName: 'closeINC',
              incident,
              id_incFiles: id,
            })
            return
          }
        }
      }
      if (oldStatus.statusINC === 'Ожидание ЗИП/оборудования') {
        if (newStatus.statusINC !== 'В работе') {
          setMessage({
            text: `Из ожидания можно вернуть только в статус "В работе"! `,
            type: 'warning',
          })
          return
        }
        if (newStatus.statusINC === 'В работе') {
          changeStatus({
            id,
            _incident: incident,
            id_incStatus: newStatus.id,
            status: newStatus.statusINC,
            timeSLA,
            log,
          })
        }
      }
      if (oldStatus.statusINC === 'Решён') {
        if (newStatus.statusINC === 'Закрыт') {
          console.log('checkForCloseINC')

          checkForCloseINC()
          setMessage({
            text: `Нельзя назначить статус "${newStatus.statusINC}"! Это может сделать либо Заказчик, либо закроется автоматически по истечению срока!`,
            type: 'warning',
          })
          return
        }
        if (newStatus.statusINC !== 'В работе') {
          setMessage({
            text: `Из статуса "Решён" можно вернуть только в статус "В работе"! `,
            type: 'warning',
          })
          return
        }
        if (newStatus.statusINC === 'В работе') {
          changeStatus({
            id,
            _incident: incident,
            id_incStatus: newStatus.id,
            status: newStatus.statusINC,
            timeSLA,
            log,
          })
        }
      }
      setStatus(data)
    }

    const handleModal = ({
      state,
      typeCompletedWork,
      commentCloseCheck,
      files,
      spaceParts,
      data,
      act,
    }: DataCloseINC) => {
      if (state === false) {
        setModal({
          status: false,
          modalName: '',
          data: emptyOptionsDD,
        })
        return
      }
      const currentDate = new Date().toISOString()
      const log = {
        User: { id: user.id!, shortName: user.shortName! },
        log: {
          id_incLog: id,
          time: currentDate,
          log: `${logs.actionComment.changeStatus.first}${incident}${logs.actionComment.changeStatus.second}${data.label}`,
          id_incLogUser: user.id!,
        },
      }

      if (files?.length) {
        changeStatus({
          id,
          _incident: incident,
          id_incStatus: data.id,
          status: data.label,
          typeCompletedWork: typeCompletedWork?.label,
          id_typeCompletedWork: typeCompletedWork?.id,
          commentCloseCheck,
          spaceParts,
          files,
          Files: files,
          act,
          timeCloseCheck: currentDate,
          id_incClosingCheck: user.id!,
          userClosingCheck: user.shortName,
          log,
        })
        setStatus(data)
        setModal({
          status: false,
          modalName: '',
          data: emptyOptionsDD,
        })

        return
      }
      changeStatus({
        id,
        _incident: incident,
        id_incStatus: data.id,
        status: data.label,
        typeCompletedWork: typeCompletedWork?.label,
        id_typeCompletedWork: typeCompletedWork?.id,
        commentCloseCheck,
        spaceParts,
        timeCloseCheck: currentDate,
        id_incClosingCheck: user.id!,
        userClosingCheck: user.shortName,
        log,
      })

      setStatus(data)
      setModal({
        status: false,
        modalName: '',
        data: emptyOptionsDD,
      })
    }

    useEffect(() => {
      const incStatus = incStatuses.find(
        ({ statusINC }) => statusINC === value,
      ) as INCStatuses
      if (incStatus) {
        setStatus({ label: incStatus.statusINC, id: incStatus.id })
      }
    }, [value, incStatuses])

    return (
      <>
        <Modal
          open={modal.status}
          onClose={() => setModal({ status: false, data: emptyOptionsDD })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          {modal.modalName === 'closeINC' ? (
            <ChangeStatus
              ref={modalClientRef}
              handleModal={handleModal}
              title={ModalTitles.closeINC}
              data={modal.data}
              incident={modal.incident as string}
              id_incFiles={modal.id_incFiles as string}
            />
          ) : (
            <></>
          )}
        </Modal>
        <DropDownINConTable
          data={incStatuses.map(({ statusINC, id }) => {
            return {
              ['label']: statusINC,
              ['id']: id as string,
            }
          })}
          onChange={setData}
          value={status.label}
        />
      </>
    )
  },
)
