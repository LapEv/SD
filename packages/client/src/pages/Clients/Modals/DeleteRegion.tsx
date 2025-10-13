import React, { SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useFilteredData } from 'hooks/useFilteredData'
import { Regions } from 'store/slices/addresses/interfaces'
import { modalStyle } from 'static/styles/modals'
import { SearchIconElement } from 'components/Icons'
import { TextField } from 'components/TextFields'
import { ITheme } from 'themes/themeConfig'

export const DeleteRegion = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ regions }, { deleteRegion, getRegions }] = useAddresses()
      const [selectedRegions, setSelectedRegions] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredRegions = useFilteredData<Regions>(regions, filterText, [
        'region',
      ])
      const theme = useTheme() as ITheme

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedRegions.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteRegion(selectedRegions)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedRegions(selectedRegions.filter(value => value !== id))
          return
        }
        setSelectedRegions([...selectedRegions, id])
        if ([...selectedRegions, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getRegions()
      }, [])

      useEffect(() => {
        getRegions()
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
          <Box
            sx={{
              width: '100%',
              pl: 3,
            }}>
            {filteredRegions.map(({ region, id }) => (
              <Item
                name={region}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id as string}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбран ни один регион!'}
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
