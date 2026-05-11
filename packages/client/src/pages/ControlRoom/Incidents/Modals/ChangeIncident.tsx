import React, { useState, memo } from 'react'
import { Divider, Modal } from '@mui/material'
import { DataAddAct, ChooseModalProps } from '../interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'
import { INC } from 'store/slices/incidents/interfaces'
import {
  TitleINC,
  ClientData,
  ContractData,
  UserData,
  TimeData,
  CompleteData,
  CommentsData,
  Logs,
  Buttons,
  AddAct,
} from '../index'
import { deepEqual } from 'utils/deepEqual'
import { ModalTitles } from '../data'
import { useFiles } from 'hooks/files/useFiles'

export const ChangeIncident = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, inc }: ChooseModalProps, ref) => {
      const [newINC, setNewINC] = useState(inc as INC)
      const [{ addAct }, { setAddAct }] = useFiles()

      const modalClientRef = React.createRef()

      const handleModalAddAct = (item: DataAddAct) => {
        if (!item.state) {
          setAddAct({ status: false, id_incFiles: '' })
        }
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer editINC'}>
          <Modal
            open={addAct.status}
            onClose={handleModalAddAct}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            {addAct ? (
              <AddAct
                ref={modalClientRef}
                handleModalAddAct={handleModalAddAct}
                title={ModalTitles.addActs}
                incident={addAct.incident as string}
                id_incFiles={addAct.id_incFiles as string}
                files={addAct.files}
              />
            ) : (
              <></>
            )}
          </Modal>
          <MuiDiv className="editContainer">
            <TitleINC newINC={newINC} handleModal={handleModal} />
            <MuiDiv className="editDataContainer">
              <ClientData newINC={newINC} setNewINC={setNewINC} />
              <MuiDiv className="editDataBox">
                <ContractData newINC={newINC} setNewINC={setNewINC} />
                <Divider className="editINC" />
                <UserData newINC={newINC} setNewINC={setNewINC} />
              </MuiDiv>
              <MuiDiv className="editDataBox">
                <TimeData newINC={newINC} />
                <Divider className="editINC" />
                <CompleteData newINC={newINC} setNewINC={setNewINC} />
              </MuiDiv>
            </MuiDiv>
            <Divider className="editINCbox" />
            <CommentsData newINC={newINC} setNewINC={setNewINC} />
            <Logs newINC={newINC} />
            <Buttons
              inc={inc as INC}
              newINC={newINC}
              setNewINC={setNewINC}
              disabled={deepEqual(
                inc as Record<never, never>,
                newINC as Record<never, never>,
              )}
              handleModal={handleModal}
            />
          </MuiDiv>
        </BoxModal>
      )
    },
  ),
)
