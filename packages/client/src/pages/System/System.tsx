import { Container, List, Modal, Typography } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { createRef, memo, useEffect, useState } from 'react'
import { menuData, sections } from './data'
import { Sections } from './Sections'
import { useSystem } from 'hooks/system/useSystem'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { ChooseModal } from './Modals/ChooseModal'

export const SystemPage = memo(() => {
  const [, { getSystem }] = useSystem()
  const [{ superAdmin }] = useAuth()

  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')
  const modalRef = createRef()

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
    getSystem()
  }, [])

  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
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

      <MuiDiv className={'headerForPages'}>
        <Typography variant="h6">Настройки системы</Typography>
        {superAdmin && (
          <DropDownMenu
            popover={'Меню'}
            data={menuData}
            onClick={checkClickMenu}
          />
        )}
      </MuiDiv>
      <List className={'pageListContainer'}>
        {sections.map(({ label, id }) => (
          <Sections label={label} id={id} key={`${id}_${label}`} />
        ))}
      </List>
    </Container>
  )
})
