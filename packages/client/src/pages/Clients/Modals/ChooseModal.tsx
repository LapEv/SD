import React, { memo } from 'react'
import {
  AddAddress,
  AddRegion,
  DeleteAddress,
  DeleteRegion,
  ChangeAddress,
  ChangeRegion,
  AddClient,
  AddContract,
  AddObject,
  DeleteObjects,
  ChangeObject,
} from './'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ modalImage, handleModal }: ChooseModalProps, ref) => {
      return (
        <>
          {modalImage === 'newClient' && (
            <AddClient
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newClient}
            />
          )}
          {modalImage === 'newContract' && (
            <AddContract
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newContract}
            />
          )}
          {modalImage === 'newObject' && (
            <AddObject
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newObject}
            />
          )}
          {modalImage === 'newAddress' && (
            <AddAddress
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newAddress}
            />
          )}
          {modalImage === 'newRegion' && (
            <AddRegion
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newRegion}
            />
          )}
          {modalImage === 'deleteObject' && (
            <DeleteObjects
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteObject}
            />
          )}
          {modalImage === 'deleteAddress' && (
            <DeleteAddress
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteAddress}
            />
          )}
          {modalImage === 'deleteRegion' && (
            <DeleteRegion
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteRegion}
            />
          )}
          {modalImage === 'changeObject' && (
            <ChangeObject
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeObject}
            />
          )}
          {modalImage === 'changeAddress' && (
            <ChangeAddress
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeAddress}
            />
          )}
          {modalImage === 'changeRegion' && (
            <ChangeRegion
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeRegion}
            />
          )}
        </>
      )
    }
  )
)
