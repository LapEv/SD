import React, { ChangeEvent, SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Item } from 'components/CheckBoxGroup'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useFilteredData } from 'hooks/useFilteredData'
import { TextField } from 'components/TextFields'
import { BoxModal, MuiDiv } from 'components/MUI'

export const ChangeRolesGroup = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { roles, rolesGroup },
        { getRoles, getRolesGroup, changeRolesGroup },
      ] = useRoles()
      const [data, setData] = useState<DataList[]>([])
      const [selectedGroup, setSelectedGroup] =
        useState<Options>(emptyOptionsDD)
      const [group, setGroup] = useState<Options[]>([])
      const [selectedRoles, setSelectedRoles] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
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
        if ([...selectedRoles, id].length && errSelectedItems)
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
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={changeData}>
          <Typography variant={'h1'}>{title}</Typography>
          <DropDown
            data={group}
            className={'dropdown_mt4'}
            props={{ mt: 3, mb: 1 }}
            onChange={data => changeGroup(data)}
            value={selectedGroup.label}
            label="Выберите группу ролей"
            errorLabel="Не выбрана группа ролей!"
          />
          {data && data.length ? (
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
          ) : (
            <></>
          )}
          <MuiDiv className={'boxDataModal'}>
            {filteredRoles.map(({ name, id, initChecked, nameId }) => (
              <Item
                name={name}
                comment={nameId}
                id={`${id}`}
                groupChecked={null}
                onChooseItems={onChooseItems}
                key={`${name}_${id}`}
                initChecked={initChecked}
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
            btnName={'Изменить'}
          />
        </BoxModal>
      )
    },
  ),
)
