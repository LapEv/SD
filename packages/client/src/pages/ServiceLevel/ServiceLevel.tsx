import React, { memo, useState } from 'react'
import { Container, Modal, Typography, List } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { ServiceList, menuData } from '.'
import { ChooseModal } from './Modals/ChooseModal'
import { ServiceDataList } from './data'
import { MuiDiv } from 'components/MUI'

export const ServiceLevelPage = memo(() => {
  const modalClientRef = React.createRef()
  const [{ admin }] = useAuth()
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

  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ChooseModal
          ref={modalClientRef}
          modalImage={modalImage}
          handleModal={handleModal}
        />
      </Modal>
      <MuiDiv className={'headerForPages'}>
        <Typography variant="h6">Уровни сервиса</Typography>
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[2, 4]}
            onClick={checkClickMenu}
          />
        )}
      </MuiDiv>
      <List className={'pageListContainer'}>
        {ServiceDataList.map(({ name, label }, index) => (
          <ServiceList name={name} label={label} key={`${label}${index}`} />
        ))}
      </List>
    </Container>
  )
})
