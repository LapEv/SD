import React, { ChangeEvent, SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { useFilteredData } from 'hooks/useFilteredData'
import { TextField } from 'components/TextFields'
import { useObjects } from 'hooks/objects/useObjects'
import { Objects } from 'store/slices/objects/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

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
        if ([...selectedObjects, id].length && errSelectedItems)
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
              setText(e.target.value ?? '')
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
            {filteredObjects.map(({ object, id, Client }) => (
              <Item
                name={object}
                comment={Client?.client as string}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${object}_${id}`}
                className={'listItems'}
                classItemText={'listItemsTextContainer'}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один адрес!'}
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
