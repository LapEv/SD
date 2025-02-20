import React, { memo } from 'react'
import { DeleteSLA, DeleteOLA, NewSLA, NewOLA } from '.'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ modalImage, handleModal }: ChooseModalProps, ref) => {
      return (
        <>
          {modalImage === 'newSLA' && (
            <NewSLA
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newSLA}
            />
          )}
          {modalImage === 'newOLA' && (
            <NewOLA
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newOLA}
            />
          )}
          {modalImage === 'deleteSLA' && (
            <DeleteSLA
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteSLA}
            />
          )}
          {modalImage === 'deleteOLA' && (
            <DeleteOLA
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteOLA}
            />
          )}
        </>
      )
    }
  )
)
