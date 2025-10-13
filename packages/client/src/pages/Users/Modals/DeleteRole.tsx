import React, { memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { boxDataModal, modalStyle } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { SearchIconElement } from 'components/Icons'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { Roles } from 'storeRoles/interfaces'
import { ITheme } from 'themes/themeConfig'

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
      const theme = useTheme() as ITheme

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
        if ([...selectedRoles, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getRoles()
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
            label="Фильтр по ролям"
            margin="normal"
            value={filterText || ''}
            onChange={({ target }) => setFilterText(target.value ?? '')}
            InputProps={{
              endAdornment: <SearchIconElement />,
            }}
          />
          <Box sx={{ ...boxDataModal }}>
            {filteredRoles.map(({ role, nameRole, id }) => (
              <Item
                name={nameRole}
                comment={role}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20, mt: 1 }}>
            {errSelectedItems && 'Не выбрана ни одна роль!'}
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
