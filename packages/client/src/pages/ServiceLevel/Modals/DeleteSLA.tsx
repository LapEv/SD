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
import { useSLA } from 'hooks/sla/useSLA'
import { SLA } from 'store/slices/sla/interfaces'
import { ITheme } from 'themes/themeConfig'

export const DeleteSLA = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ sla }, { deleteSLA, getSLA }] = useSLA()
      const [selectedSLA, setSelectedSLA] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const [data, setData] = useState<SLA[]>([])
      const filteredSLA = useFilteredData<SLA>(data, filterText, [
        'sla',
        'types',
      ])
      const theme = useTheme() as ITheme

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedSLA.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteSLA(selectedSLA)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedSLA(selectedSLA.filter(value => value !== id))
          return
        }
        setSelectedSLA([...selectedSLA, id])
        if ([...selectedSLA, id] && errSelectedItems) setErrSelectedItems(false)
      }

      useEffect(() => {
        getSLA()
      }, [])

      useEffect(() => {
        const newData = sla.map(item => {
          return { ...item, types: item.TypesOfWork.typeOfWork }
        })
        setData(newData)
      }, [sla])

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
            {filteredSLA.map(({ sla, id, TypesOfWork }) => (
              <Item
                name={sla}
                comment={TypesOfWork.typeOfWork}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id as string}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбран ни один SLA!'}
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
