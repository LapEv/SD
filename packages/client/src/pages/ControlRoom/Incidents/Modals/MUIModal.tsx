import { createRef, SyntheticEvent } from 'react'
import { Modal } from '@mui/material'
import { ChooseModal } from './ChooseModal'
import { useTableINC } from 'hooks/tableINC/useTableINC'

export const MUIModal = () => {
  const [{ modal }, { setModal }] = useTableINC()
  const modalClientRef = createRef()

  const onClose = (event: SyntheticEvent<EventTarget>, reason: string) => {
    if (reason === 'backdropClick' && event) {
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
