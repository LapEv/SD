import React, { memo, useEffect, useState } from 'react'
import { Box, Container, Modal, Typography, List } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData, Equipments } from './'
import { ChooseModal } from './Modals/ChooseModal'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { headerForPages, mainHeaderForPages } from 'static/styles'
import { page } from 'static/styles/pages/main'

export const ClassifierPage = memo(() => {
  const modalClientRef = React.createRef()
  const [{ admin }] = useAuth()
  const [{ equipments }, { getClassifierEquipments, setActiveEquipment }] =
    useClassifier()
  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  const checkClickMenu = (name: string | null) => {
    if (name) {
      setModal(true)
      setModalImage(name)
      setActiveEquipment('')
    }
  }

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  useEffect(() => {
    getClassifierEquipments()
  }, [])

  return (
    <Container component="main" maxWidth="md" sx={mainHeaderForPages}>
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
      <Box component="div" sx={headerForPages}>
        <Typography variant="h6">Классификатор</Typography>
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[3, 6]}
            onClick={checkClickMenu}
          />
        )}
      </Box>
      <List sx={{ ...page, maxWidth: 1200 }}>
        {equipments.map(
          ({ equipment, id, ClassifierModels, TypicalMalfunctions }) => (
            <Equipments
              equipment={equipment}
              id={id}
              key={id}
              ClassifierModels={ClassifierModels}
              TypicalMalfunctions={TypicalMalfunctions}
            />
          ),
        )}
      </List>
    </Container>
  )
})
