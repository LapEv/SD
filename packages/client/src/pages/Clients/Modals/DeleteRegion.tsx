import React, { ChangeEvent, SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useFilteredData } from 'hooks/useFilteredData'
import { Regions } from 'store/slices/addresses/interfaces'
import { TextField } from 'components/TextFields'
import { BoxModal, MuiDiv } from 'components/MUI'

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
        if ([...selectedRegions, id].length && errSelectedItems)
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
            {filteredRegions.map(({ region, id }) => (
              <Item
                name={region}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${region}_${id}`}
                className={'listItems'}
                classItemText={'listItemsTextContainer'}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один регион!'}
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
