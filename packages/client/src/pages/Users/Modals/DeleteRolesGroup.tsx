import React, { ChangeEvent, SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { Item } from 'components/CheckBoxGroup'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { RolesGroup } from 'storeRoles/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteRolesGroup = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ rolesGroup }, { getRoles, getRolesGroup, deleteRolesGroup }] =
        useRoles()
      const [selectedRolesGroup, setSelectedRolesGroup] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredRolesGroups = useFilteredData<RolesGroup>(
        rolesGroup,
        filterText,
        ['groupName', 'group'],
      )

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedRolesGroup.length) {
          setErrSelectedItems(true)
          return
        }
        deleteRolesGroup(selectedRolesGroup)
        handleModal(false)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedRolesGroup(
            selectedRolesGroup.filter(value => value !== id),
          )
          return
        }
        setSelectedRolesGroup([...selectedRolesGroup, id])
        if ([...selectedRolesGroup, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getRoles()
        getRolesGroup()
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
            label="Фильтр по группе ролей"
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
            {filteredRolesGroups.map(({ groupName, group, id }) => (
              <Item
                name={groupName}
                comment={group}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${groupName}_${id}`}
                className={'listItemsChangeRolesGr'}
                classItemText={'listItemsTextContainer'}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
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
