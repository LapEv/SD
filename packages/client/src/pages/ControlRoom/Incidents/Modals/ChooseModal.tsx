import React, { memo } from 'react'
import {
  ChangeIncident,
  ChangeIncidentStatuses,
  ChangeStateStatuses,
  ChangeTypeCompletedWork,
  ChangeTypeOfWork,
  DeleteIncidentStatus,
  DeleteTypesCompletedWork,
  DeleteTypesOfWork,
  NewIncident,
  NewIncidentStatus,
  NewRequest,
  NewTypeCompletedWork,
  NewTypesOfWork,
} from '.'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'
import { PrintINC } from './PrintINC'

export const ChooseModal = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    (
      { modalImage, handleModal, id, incident, inc, options }: ChooseModalProps,
      ref,
    ) => {
      return (
        <>
          {modalImage === 'newIncident' && (
            <NewIncident
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newIncident}
            />
          )}
          {modalImage === 'newRequest' && (
            <NewRequest
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newRequest}
              id={id}
              incident={incident}
            />
          )}
          {modalImage === 'newIncidentStatus' && (
            <NewIncidentStatus
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newIncidentStatus}
            />
          )}
          {modalImage === 'newTypesOfWork' && (
            <NewTypesOfWork
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newTypesOfWork}
            />
          )}
          {modalImage === 'newTypeCompletedWork' && (
            <NewTypeCompletedWork
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.newTypeCompletedWork}
            />
          )}
          {modalImage === 'deleteIncidentStatuses' && (
            <DeleteIncidentStatus
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteIncidentStatuses}
            />
          )}
          {modalImage === 'deleteTypesOfWork' && (
            <DeleteTypesOfWork
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteTypesOfWork}
            />
          )}
          {modalImage === 'deleteTypesCompletedWork' && (
            <DeleteTypesCompletedWork
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteTypesCompletedWork}
            />
          )}
          {modalImage === 'changeIncidentStatuses' && (
            <ChangeIncidentStatuses
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeIncidentStatuses}
            />
          )}
          {modalImage === 'changeTypesOfWork' && (
            <ChangeTypeOfWork
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeTypesOfWork}
            />
          )}
          {modalImage === 'changeTypesCompletedWork' && (
            <ChangeTypeCompletedWork
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeTypesCompletedWork}
            />
          )}
          {modalImage === 'printINC' && (
            <PrintINC
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.printINC}
            />
          )}
          {modalImage === 'changeStateStatuses' && (
            <ChangeStateStatuses
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeStateStatuses}
            />
          )}
          {modalImage === 'changeIncident' && (
            <ChangeIncident
              ref={ref}
              inc={inc}
              options={options}
              handleModal={handleModal}
              title={`${ModalTitles.changeIncident} ${incident}`}
            />
          )}
        </>
      )
    },
  ),
)
