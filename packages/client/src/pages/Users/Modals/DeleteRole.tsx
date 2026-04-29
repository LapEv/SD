import React, { ChangeEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Typography } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { Roles } from 'storeRoles/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteRole = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ roles }, { getRoles, deleteRoles }] = useRoles()
      const [selectedRoles, setSelectedRoles] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredRoles = useFilteredData<Roles>(roles, filterText, [
        'nameRole',
        'role',
      ])

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedRoles.length) {
          setErrSelectedItems(true)
          return
        }

        deleteRoles(selectedRoles)
        handleModal(false)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedRoles(selectedRoles.filter(value => value !== id))
          return
        }
        setSelectedRoles([...selectedRoles, id])
        if ([...selectedRoles, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getRoles()
      }, [])

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={changeData}>
          <Typography variant={'h1'}>{title}</Typography>
          <TextField
            variant="outlined"
            className="modalTextContainer"
            label="Фильтр по ролям"
            margin="normal"
            value={filterText || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilterText(e.target.value ?? '')
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
            {filteredRoles.map(({ role, nameRole, id }) => (
              <Item
                name={nameRole}
                comment={role}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${nameRole}_${id}`}
                className={'listItemsChangeRolesGr'}
                classItemText={'listItemsTextContainer'}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбрана ни одна роль!'}
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
