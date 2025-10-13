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
import { OLA } from 'store/slices/sla/interfaces'
import { ITheme } from 'themes/themeConfig'

export const DeleteOLA = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ ola }, { deleteOLA, getOLA }] = useSLA()
      const [selectedOLA, setSelectedOLA] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const [data, setData] = useState<OLA[]>([])
      const filteredOLA = useFilteredData<OLA>(data, filterText, [
        'ola',
        'types',
      ])
      const theme = useTheme() as ITheme

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedOLA.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteOLA(selectedOLA)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedOLA(selectedOLA.filter(value => value !== id))
          return
        }
        setSelectedOLA([...selectedOLA, id])
        if ([...selectedOLA, id] && errSelectedItems) setErrSelectedItems(false)
      }

      useEffect(() => {
        getOLA()
      }, [])

      useEffect(() => {
        const newData = ola.map(item => {
          return { ...item, types: item.TypesOfWork.typeOfWork }
        })
        setData(newData)
      }, [ola])

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
            {filteredOLA.map(({ ola, id, TypesOfWork }) => (
              <Item
                name={ola}
                comment={TypesOfWork.typeOfWork}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id as string}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбран ни один OLA!'}
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
