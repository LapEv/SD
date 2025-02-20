import React, { SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { Department } from 'store/slices/structure/interfaces'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { modalStyle, boxDataModal } from 'static/styles'
import { SearchIconElement } from 'components/Icons'
import { ITheme } from 'themes/themeConfig'

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
      const theme = useTheme() as ITheme

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
        if ([...selectedDepartments, id] && errSelectedItems)
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
            label="Введите фильтр"
            margin="normal"
            value={filterText || ''}
            onChange={({ target }) => setFilterText(target.value ?? '')}
            InputProps={{
              endAdornment: <SearchIconElement />,
            }}
          />
          <Box sx={boxDataModal}>
            {filteredDepartments.map(
              ({ departmentName, id, division, department }) => (
                <Item
                  name={departmentName}
                  comment={department}
                  comment2={`Дивизион: ${division}`}
                  id={`${id}`}
                  groupChecked={false}
                  onChooseItems={onChooseItems}
                  key={id as string}
                />
              ),
            )}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбран ни один отдел!'}
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
