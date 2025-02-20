import React, { SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { modalStyle, boxDataModal } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Item } from 'components/CheckBoxGroup'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useFilteredData } from 'hooks/useFilteredData'
import { TextField } from 'components/TextFields'
import { SearchIconElement } from 'components/Icons'
import { ITheme } from 'themes/themeConfig'

export const ChangeRolesGroup = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { roles, rolesGroup },
        { getRoles, getRolesGroup, changeRolesGroup },
      ] = useRoles()
      const [data, setData] = useState<DataList[]>([])
      const [selectedGroup, setSelectedGroup] = useState<Options>(emptyValue)
      const [group, setGroup] = useState<Options[]>([])
      const [selectedRoles, setSelectedRoles] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const theme = useTheme() as ITheme
      const [filterText, setFilterText] = useState<string>('')
      const filteredRoles = useFilteredData<DataList>(data, filterText, [
        'name',
        'nameId',
      ])

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedGroup.id.length) {
          setErrSelectedItems(true)
          return
        }
        changeRolesGroup(selectedRoles, selectedGroup.id)
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

      const changeGroup = (data: Options) => {
        if (!data.id) {
          setData([])
          return
        }
        const useRoles = rolesGroup
          .find(({ id }) => id === data.id)
          ?.Roles?.map(({ id }) => id) as string[]
        setData(
          roles.map(({ id, role, nameRole }) => {
            return {
              name: nameRole,
              id: id,
              nameId: role,
              initChecked:
                useRoles.findIndex(value => value === id) >= 0 ? true : false,
            }
          }),
        )
        setSelectedGroup(data)
        setSelectedRoles(useRoles)
      }

      useEffect(() => {
        getRoles()
        getRolesGroup()
      }, [])

      useEffect(() => {
        setGroup(
          rolesGroup
            .map(item => {
              return {
                ['label']: item.groupName as string,
                ['id']: item.id as string,
              }
            })
            .filter(item => item.label !== 'SUPERADMIN')
            .filter(item => item.label !== 'ADMIN'),
        )
      }, [rolesGroup])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={changeData}>
          <Typography variant={'h6'}>{title}</Typography>
          <DropDown
            data={group}
            props={{ mt: theme.fontSize === 'small' ? 6 : 4 }}
            onChange={data => changeGroup(data)}
            value={selectedGroup.label}
            label="Выберите группу ролей"
            errorLabel="Не выбрана группа ролей!"
          />
          {data && data.length ? (
            <TextField
              variant="outlined"
              sx={{ width: '90%', mt: 3, height: 40 }}
              label="Фильтр по ролям"
              margin="normal"
              value={filterText || ''}
              onChange={({ target }) => setFilterText(target.value ?? '')}
              InputProps={{
                endAdornment: <SearchIconElement />,
              }}
            />
          ) : (
            <></>
          )}
          <Box sx={boxDataModal}>
            {filteredRoles.map(({ name, id, initChecked, nameId }) => (
              <Item
                name={name}
                comment={nameId}
                id={`${id}`}
                groupChecked={null}
                onChooseItems={onChooseItems}
                key={id}
                initChecked={initChecked}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName={'Изменить'}
          />
        </Box>
      )
    },
  ),
)
