import React, { ChangeEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { useFilteredData } from 'hooks/useFilteredData'
import { TextField } from 'components/TextFields'
import { useSLA } from 'hooks/sla/useSLA'
import { OLA } from 'store/slices/sla/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

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
        if ([...selectedOLA, id].length && errSelectedItems)
          setErrSelectedItems(false)
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
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один OLA!'}
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
