import React, { memo } from 'react'
import {
  DeleteClassifierModel,
  DeleteClassifierEquipment,
  DeleteTypicalMalfunction,
  NewClassifierEquipment,
  NewClassifierModel,
  NewTypicalMalfunction,
  ChangeTypicalMalfunction,
} from './'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ modalImage, handleModal }: ChooseModalProps, ref) => {
      return (
        <>
          {modalImage === 'newClassifierEquipment' && (
            <NewClassifierEquipment
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newClassifierEquipment}
            />
          )}
          {modalImage === 'newClassifierModel' && (
            <NewClassifierModel
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newClassifierModel}
            />
          )}
          {modalImage === 'newTypicalMalfunction' && (
            <NewTypicalMalfunction
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newTypicalMalfunction}
            />
          )}
          {modalImage === 'deleteClassifierEquipment' && (
            <DeleteClassifierEquipment
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteClassifierEquipment}
            />
          )}
          {modalImage === 'deleteClassifierModel' && (
            <DeleteClassifierModel
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteClassifierModel}
            />
          )}
          {modalImage === 'deleteTypicalMalfunction' && (
            <DeleteTypicalMalfunction
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteTypicalMalfunction}
            />
          )}
          {modalImage === 'changeTypicalMalfunction' && (
            <ChangeTypicalMalfunction
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeTypicalMalfunction}
            />
          )}
        </>
      )
    }
  )
)
