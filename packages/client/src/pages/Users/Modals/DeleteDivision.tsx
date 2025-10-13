import React, { memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle, boxDataModal } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { useFilteredData } from 'hooks/useFilteredData'
import { SearchIconElement } from 'components/Icons'
import { Division } from 'store/slices/structure/interfaces'
import { TextField } from 'components/TextFields'
import { ITheme } from 'themes/themeConfig'

export const DeleteDivision = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ divisions }, { deleteDivision, getDivisions }] = useStructure()
      const [selectedDivisions, setSelectedDivisions] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredDivisions = useFilteredData<Division>(
        divisions,
        filterText,
        ['divisionName', 'division'],
      )
      const theme = useTheme() as ITheme

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedDivisions.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteDivision(selectedDivisions)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedDivisions(selectedDivisions.filter(value => value !== id))
          return
        }
        setSelectedDivisions([...selectedDivisions, id])
        if ([...selectedDivisions, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getDivisions()
      }, [])

      const setText = (text: string) => {
        setFilterText(text)
      }

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
            sx={{ width: '90%', mt: 2 }}
            label="Введите фильтр"
            margin="normal"
            value={filterText || ''}
            onChange={e => setText(e.target.value ?? '')}
            InputProps={{
              endAdornment: <SearchIconElement />,
            }}
          />
          <Box sx={boxDataModal}>
            {filteredDivisions.map(({ divisionName, division, id }) => (
              <Item
                name={divisionName}
                comment={division}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id as string}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбран ни один дивизион!'}
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
