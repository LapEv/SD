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
import { TextField } from 'components/TextFields'
import { Addresses } from 'store/slices/addresses/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteAddress = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ regions, addresses }, { deleteAddress, getAddresses }] =
        useAddresses()
      const [selectedAddresses, setSelectedAddresses] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [data, setData] = useState<Addresses[]>([])
      const [filterText, setFilterText] = useState<string>('')
      const filteredAddresses = useFilteredData<Addresses>(data, filterText, [
        'address',
        'region',
      ])

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedAddresses.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteAddress(selectedAddresses)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedAddresses(selectedAddresses.filter(value => value !== id))
          return
        }
        setSelectedAddresses([...selectedAddresses, id])
        if ([...selectedAddresses, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getAddresses()
      }, [])

      useEffect(() => {
        const newData = addresses.map(item => {
          return { ...item, region: item?.Region?.region }
        })
        setData(newData)
      }, [addresses])

      const getRegionName = (id_region: string) => {
        return regions.find(item => item.id === id_region)?.region
      }

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
            {filteredAddresses.map(({ address, id, id_region }) => (
              <Item
                name={address}
                comment={getRegionName(id_region as string)}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${address}_${id}`}
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
