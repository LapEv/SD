import React, { SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { modalStyle, boxDataModal } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { Item } from 'components/CheckBoxGroup'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { SearchIconElement } from 'components/Icons'
import { RolesGroup } from 'storeRoles/interfaces'
import { ITheme } from 'themes/themeConfig'

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
      const theme = useTheme() as ITheme

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
        if ([...selectedRolesGroup, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getRoles()
        getRolesGroup()
      }, [])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={changeData}>
          <Typography variant={'h6'}>{title}</Typography>
          <TextField
            variant="outlined"
            sx={{ width: '90%', mt: 2, height: 40 }}
            label="Фильтр по группе ролей"
            margin="normal"
            value={filterText || ''}
            onChange={({ target }) => setFilterText(target.value ?? '')}
            InputProps={{
              endAdornment: <SearchIconElement />,
            }}
          />
          <Box sx={{ ...boxDataModal }}>
            {filteredRolesGroups.map(({ groupName, group, id }) => (
              <Item
                name={groupName}
                comment={group}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Удалить"
          />
        </Box>
      )
    },
  ),
)
