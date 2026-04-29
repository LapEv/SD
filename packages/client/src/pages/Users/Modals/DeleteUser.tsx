import React, { ChangeEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { useAuth } from 'hooks/auth/useAuth'
import { TextField } from 'components/TextFields'
import { User } from 'storeAuth/interfaces'
import { useFilteredData } from 'hooks/useFilteredData'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteUser = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ users }, { deleteUser, getActiveUsers }] = useAuth()
      const [selectedUser, setSelectedUser] = useState<string>('')
      const [reasonOfDelete, setReason] = useState<string>('')
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const [filterText, setFilterText] = useState<string>('')
      const filteredusers = useFilteredData<User>(users, filterText, [
        'lastName',
        'post',
      ])

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedUser.length) {
          setErrSelectedItems('Не выбрано ниодного пользователя!')
          return
        }
        if (!reasonOfDelete.length) {
          setErrSelectedItems('Не указана причина удаления!')
          return
        }
        handleModal(false)
        deleteUser(selectedUser, reasonOfDelete)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedUser('')
          return
        }
        setSelectedUser(id)
        if (id && reasonOfDelete.length) setErrSelectedItems('')
      }

      useEffect(() => {
        getActiveUsers({})
      }, [])

      const setText = (text: string) => {
        setFilterText(text)
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={changeData}>
          <Typography variant={'h6'}>{title}</Typography>
          <TextField
            variant="outlined"
            className="modalTextContainer"
            label="Фильтр по фамилии"
            margin="normal"
            value={filterText || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value ?? '')
            }
            slotProps={{
              input: {
                endAdornment: (
                  <ClearSearchModalSection
                    length={filterText.length}
                    handleClick={() => setFilterText('')}
                  />
                ),
              },
            }}
          />
          <MuiDiv className={'boxDataModal'}>
            {filteredusers.map(
              ({ lastName, firstName, middleName, post, id }) => (
                <Item
                  name={`${lastName} ${firstName} ${middleName}`}
                  comment={post as string}
                  id={`${id}`}
                  groupChecked={false}
                  onChooseItems={onChooseItems}
                  oneChecked={selectedUser === id ? true : false}
                  key={`${lastName}_${firstName}_${id}`}
                  className={'listItemsChangeRolesGr'}
                  classItemText={'listItemsTextContainer'}
                />
              ),
            )}
          </MuiDiv>
          <TextField
            label="Причина удаления"
            variant="outlined"
            required
            className={'textContainer_w90_mt3'}
            margin="normal"
            value={reasonOfDelete || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setReason(e.target.value ?? '')
            }
          />

          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбрано ниодного пользователя!'}
          </MuiDiv>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Удалить"
          />
        </BoxModal>
      )
    },
  ),
)
