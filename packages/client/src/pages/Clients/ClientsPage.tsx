import React, { memo, useEffect, useState } from 'react'
import { Container, Modal, Typography, List } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData } from './data'
import { ChooseModal } from './Modals/ChooseModal'
import { useClients } from 'hooks/clients/useClients'
import { ClientsList } from './ClientsList'
import { MuiDiv } from 'components/MUI'

export const ClientsPage = memo(() => {
  const modalClientRef = React.createRef()
  const [{ admin }] = useAuth()
  const [{ clients }, { getClients }] = useClients()

  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  const checkClickMenu = (name: string | null) => {
    if (name) {
      setModal(true)
      setModalImage(name)
    }
  }

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  useEffect(() => {
    getClients()
  }, [])

  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        disableEnforceFocus
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ChooseModal
          ref={modalClientRef}
          modalImage={modalImage}
          handleModal={handleModal}
        />
      </Modal>
      <MuiDiv className={'headerForPages'}>
        <Typography variant="h6">Клиенты</Typography>
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[5, 8]}
            onClick={checkClickMenu}
          />
        )}
      </MuiDiv>
      <List className={'pageListContainer'}>
        {clients.map(({ client, legalName, id }) => (
          <ClientsList client={client} legalName={legalName} id={id} key={id} />
        ))}
      </List>
    </Container>
  )
})
