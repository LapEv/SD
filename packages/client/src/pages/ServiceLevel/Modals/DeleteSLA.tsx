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
import { SLA } from 'store/slices/sla/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

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
        if ([...selectedSLA, id].length && errSelectedItems)
          setErrSelectedItems(false)
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
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один SLA!'}
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
