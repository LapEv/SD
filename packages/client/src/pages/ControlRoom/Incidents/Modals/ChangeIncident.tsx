import React, { useState, memo } from 'react'
import { Divider } from '@mui/material'
import { ChooseModalProps } from '../interfaces'
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
} from '../index'
import { deepEqual } from 'utils/deepEqual'

export const ChangeIncident = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, inc }: ChooseModalProps, ref) => {
      const [newINC, setNewINC] = useState(inc as INC)

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer editINC'}>
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
