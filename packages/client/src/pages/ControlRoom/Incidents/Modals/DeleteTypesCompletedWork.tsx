import React, { memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle, boxDataModal } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useFilteredData } from 'hooks/useFilteredData'
import { SearchIconElement } from 'components/Icons'
import { TextField } from 'components/TextFields'
import { useIncidents } from 'hooks/incidents/useINC'
import { TypesCompletedWork } from 'store/slices/incidents/interfaces'

export const DeleteTypesCompletedWork = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { typesCompletedWork },
        { deleteTypesCompletedWork, getTypesCompletedWork },
      ] = useIncidents()
      const [selectedTypeCompletedWork, setSelectedTypeCompletedWork] =
        useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredTypesCompletedWork = useFilteredData<TypesCompletedWork>(
        typesCompletedWork,
        filterText,
        ['typeOfWork'],
      )
      const theme = useTheme()

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedTypeCompletedWork.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteTypesCompletedWork(selectedTypeCompletedWork)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedTypeCompletedWork(
            selectedTypeCompletedWork.filter(value => value !== id),
          )
          return
        }
        setSelectedTypeCompletedWork([...selectedTypeCompletedWork, id])
        if ([...selectedTypeCompletedWork, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getTypesCompletedWork()
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
            sx={{ width: '90%', mt: 2, height: 40 }}
            label="Введите фильтр"
            margin="normal"
            value={filterText || ''}
            onChange={e => setText(e.target.value ?? '')}
            InputProps={{
              endAdornment: <SearchIconElement />,
            }}
          />
          <Box sx={boxDataModal}>
            {filteredTypesCompletedWork.map(({ typeCompletedWork, id }) => (
              <Item
                name={typeCompletedWork}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id as string}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбрано ни одного типа выполненных работ!'}
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
