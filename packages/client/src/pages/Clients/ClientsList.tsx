import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import { ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton } from 'components/Buttons'
import { ModalChangeName } from 'components/ModaQuestions'
import { useClients } from 'hooks/clients/useClients'
import { useAuth } from 'hooks/auth/useAuth'
import { AddContract } from './Modals'
import { ModalTitles } from './data'
import { MuiDiv } from 'components/MUI'
import { General } from './components/General/General'
import { Contracts } from './components/Contracts/Contracts'
import { IClientsList } from './interfaces'

export const ClientsList = memo(({ clientData }: IClientsList) => {
  const [{ activeClient }, { changeClient, setActiveClient }] = useClients()
  const [{ admin }] = useAuth()
  const modalRef = React.createRef()
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  const handleClick = () => {
    setActiveClient(clientData.id as string)
    setOpen(!open)
  }

  const changeClientName = (answer: boolean, text: string) => {
    setModal(false)
    if (!answer) return
    changeClient({
      client: text,
      legalName: clientData.legalName,
      id: clientData.id,
    })
  }

  useEffect(() => {
    if (activeClient !== clientData.id) {
      setOpen(false)
    }
  }, [activeClient])

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  const editClient = (event: SyntheticEvent<EventTarget>) => {
    event.stopPropagation()
    setModal(true)
    setModalImage('')
  }

  const AddNewContract = () => {
    setModal(true)
    setModalImage('newContract')
  }

  return (
    <MuiDiv className={'containerCollapse'}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        {modalImage ? (
          <AddContract
            ref={modalRef}
            handleModal={handleModal}
            title={ModalTitles.newContract}
          />
        ) : (
          <ModalChangeName
            answer={changeClientName}
            handleModal={handleModal}
            ref={modalRef}
            question="Введите новое наименование клиента"
          />
        )}
      </Modal>
      <ListItemButton
        divider={open}
        className={'itemButtonCollapse1 height'}
        onClick={handleClick}>
        <ListItemText
          primary={clientData.client ?? ''}
          secondary={clientData.legalName ?? ''}
        />
        {admin && <EditButton handleClick={editClient} />}
        <RotateButton open={open} handleClick={handleClick} />
      </ListItemButton>
      <Collapse
        className={'width_100_height_auto'}
        in={open}
        timeout="auto"
        unmountOnExit>
        <General clientData={clientData} />
        <Contracts
          client={clientData.client ?? ''}
          legalName={clientData.legalName ?? ''}
          id={clientData.id ?? ''}
          AddNewContract={AddNewContract}
        />
      </Collapse>
    </MuiDiv>
  )
})
