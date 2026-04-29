import React, { ChangeEvent, SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { Department } from 'store/slices/structure/interfaces'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteDepartment = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ departaments }, { deleteDepartment, getDepartments }] =
        useStructure()
      const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
        [],
      )
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [data, setData] = useState<Department[]>([])
      const [filterText, setFilterText] = useState<string>('')
      const filteredDepartments = useFilteredData<Department>(
        data,
        filterText,
        ['departmentName', 'department', 'division'],
      )

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedDepartments.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteDepartment(selectedDepartments)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedDepartments(
            selectedDepartments.filter(value => value !== id),
          )
          return
        }
        setSelectedDepartments([...selectedDepartments, id])
        if ([...selectedDepartments, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getDepartments()
      }, [])

      useEffect(() => {
        const newData = departaments.map(item => {
          return { ...item, division: item?.Division?.divisionName }
        })
        setData(newData)
      }, [departaments])

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
            label="Введите фильтр"
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
            {filteredDepartments.map(
              ({ departmentName, id, division, department }) => (
                <Item
                  name={departmentName}
                  comment={department}
                  comment2={`Дивизион: ${division}`}
                  id={`${id}`}
                  groupChecked={false}
                  onChooseItems={onChooseItems}
                  key={`${departmentName}_${id}`}
                  className={'listItemsChangeRolesGr'}
                  classItemText={'listItemsTextContainer'}
                />
              ),
            )}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один отдел!'}
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
