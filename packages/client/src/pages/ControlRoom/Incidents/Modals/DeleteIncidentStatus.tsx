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
import { INCStatuses } from 'store/slices/incidents/interfaces'

export const DeleteIncidentStatus = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const boxRef = React.createRef<HTMLDivElement>()
      const [height, setHeight] = useState<string>('')
      const [{ incStatuses }, { deleteIncidentStatuses, getIncidentStatuses }] =
        useIncidents()
      const [selectedincStatuses, setSelectedincStatuses] = useState<string[]>(
        [],
      )
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredIncStatuses = useFilteredData<INCStatuses>(
        incStatuses,
        filterText,
        ['statusINC'],
      )
      const theme = useTheme()

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedincStatuses.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteIncidentStatuses(selectedincStatuses)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedincStatuses(
            selectedincStatuses.filter(value => value !== id),
          )
          return
        }
        setSelectedincStatuses([...selectedincStatuses, id])
        if (errSelectedItems && [...selectedincStatuses, id])
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getIncidentStatuses()
        if (boxRef.current) {
          setHeight(boxRef.current.offsetHeight.toString())
        }
      }, [])

      const setText = (text: string) => {
        if (!height && boxRef.current) {
          setHeight(boxRef.current.offsetHeight.toString())
        }
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
            sx={{ width: '90%', mt: 3, height: 40 }}
            label="Введите фильтр"
            margin="normal"
            value={filterText || ''}
            onChange={e => setText(e.target.value ?? '')}
            InputProps={{
              endAdornment: <SearchIconElement />,
            }}
          />
          <Box
            ref={boxRef}
            sx={{
              ...boxDataModal,
              height: filterText ? height : 'auto',
              width: '95%',
            }}>
            {filteredIncStatuses.map(({ statusINC, id }) => (
              <Item
                name={statusINC}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id as string}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбран ни один статус инцидента!'}
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
