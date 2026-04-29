import { createRef } from 'react'
import { Modal } from '@mui/material'
import { ChooseModal } from './ChooseModal'
import { useTableINC } from 'hooks/tableINC/useTableINC'

export const MUIModal = () => {
  const [{ modal }, { setModal }] = useTableINC()
  const modalClientRef = createRef()

  return (
    <Modal
      open={modal.active}
      onClose={() => setModal({ active: false, image: '' })}
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
