import React, { SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useFilteredData } from 'hooks/useFilteredData'
import { TextField } from 'components/TextFields'
import { modalStyle } from 'static/styles/modals'
import { SearchIconElement } from 'components/Icons'
import { useObjects } from 'hooks/objects/useObjects'
import { Objects } from 'store/slices/objects/interfaces'
import { ITheme } from 'themes/themeConfig'

export const DeleteObjects = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ objects }, { deleteObjects, getObjects }] = useObjects()
      const [selectedObjects, setSelectedObjects] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [data, setData] = useState<Objects[]>([])
      const [filterText, setFilterText] = useState<string>('')
      const filteredObjects = useFilteredData<Objects>(data, filterText, [
        'object',
        'client',
      ])
      const theme = useTheme() as ITheme

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedObjects.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteObjects(selectedObjects)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedObjects(selectedObjects.filter(value => value !== id))
          return
        }
        setSelectedObjects([...selectedObjects, id])
        if ([...selectedObjects, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getObjects()
      }, [])

      useEffect(() => {
        const newData = objects.map(item => {
          return { ...item, client: item?.Client?.client }
        })
        setData(newData)
      }, [objects])

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
              mt: 0,
              width: '100%',
              pl: 3,
            }}>
            {filteredObjects.map(({ object, id, Client }) => (
              <Item
                name={object}
                comment={Client?.client as string}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id as string}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбран ни один адрес!'}
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
