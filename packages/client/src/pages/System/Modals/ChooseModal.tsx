import React, { memo } from 'react'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'
import { ChangePassword } from './ChangePassword'

export const ChooseModal = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ modalImage, handleModal }: ChooseModalProps, ref) => {
      return (
        <>
          {modalImage === 'changePassword' && (
            <ChangePassword
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changePassword}
            />
          )}
        </>
      )
    },
  ),
)
