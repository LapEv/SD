import React, { memo, useEffect, useState } from 'react'
import { Box, Container, Typography, List, Modal } from '@mui/material'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { ChooseModal } from './Modals'
import { Divisions } from './'
import { useAuth } from 'hooks/auth/useAuth'
import { headerForPages, mainHeaderForPages } from 'static/styles'
import { menuData } from './menuData'
import { page } from 'static/styles/pages/main'

export const UsersPage = memo(() => {
  const modalRef = React.createRef()
  const [{ admin }] = useAuth()
  const [{ divisions }, { getDivisions }] = useStructure()
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
    getDivisions()
  }, [])

  return (
    <Container component="main" maxWidth="md" sx={mainHeaderForPages}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ChooseModal
          ref={modalRef}
          modalImage={modalImage}
          handleModal={handleModal}
        />
      </Modal>
      <Box component="div" sx={headerForPages}>
        <Typography variant="h6">Пользователи</Typography>
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[5, 10]}
            onClick={checkClickMenu}
          />
        )}
      </Box>
      <List sx={{ ...page, maxWidth: 1200 }}>
        {divisions.map(({ divisionName, id, Departments }) => (
          <Divisions
            divisionName={divisionName}
            id_division={id}
            key={id}
            Departments={Departments}
          />
        ))}
      </List>
    </Container>
  )
})
