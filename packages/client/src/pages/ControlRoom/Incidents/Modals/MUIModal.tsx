import { createRef, SyntheticEvent } from 'react'
import { Modal } from '@mui/material'
import { ChooseModal } from './ChooseModal'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useApp } from 'hooks/app/useApp'

export const MUIModal = () => {
  const [{ modal }, { setModal }] = useTableINC()
  const [{ device }] = useApp()
  const modalClientRef = createRef()

  const onClose = (event: SyntheticEvent<EventTarget>, reason: string) => {
    if (reason === 'backdropClick') {
      return
    }
    if (reason === 'escapeKeyDown') {
      if ((event.target as HTMLElement).classList.value.includes('editINC'))
        return
      if (
        (event.target as HTMLElement).classList.value.includes(
          'viewActIconButton',
        )
      )
        return
    }
    setModal({ active: false, image: '' })
  }

  return (
    <Modal
      open={modal.active}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ padding: device === 'mobile' ? '5px' : '50px' }}
      disableScrollLock={true}>
      <ChooseModal
        ref={modalClientRef}
        modalImage={modal.image}
        handleModal={(bool: boolean) => {
          setModal({ active: bool, image: '' })
        }}
        id={modal.id}
        incident={modal.incident}
        inc={modal.inc}
      />
    </Modal>
  )
}
