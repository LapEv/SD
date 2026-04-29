import React, { ChangeEvent, SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { TypicalMalfunctions } from 'store/slices/classifier/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteTypicalMalfunction = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { typicalMalfunctions, equipments },
        { deleteTypicalMalfunction, getTypicalMalfunctions },
      ] = useClassifier()
      const [selectedTypicalMalfunctions, setSelectedTypicalMalfunctions] =
        useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [data, setData] = useState<TypicalMalfunctions[]>([])
      const [filterText, setFilterText] = useState<string>('')
      const filteredTypicalMalfunctions = useFilteredData<TypicalMalfunctions>(
        data,
        filterText,
        ['typicalMalfunction', 'equipment'],
      )

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedTypicalMalfunctions.length) {
          setErrSelectedItems(true)
          return
        }
        deleteTypicalMalfunction(selectedTypicalMalfunctions)
        handleModal(false)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedTypicalMalfunctions(
            selectedTypicalMalfunctions.filter(value => value !== id),
          )
          return
        }
        setSelectedTypicalMalfunctions([...selectedTypicalMalfunctions, id])
        if ([...selectedTypicalMalfunctions, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getTypicalMalfunctions()
      }, [])

      const getEquipmentName = (id_equipment: string) => {
        return equipments.find(item => item.id === id_equipment)?.equipment
      }

      useEffect(() => {
        const newData = typicalMalfunctions.map(item => {
          return { ...item, equipment: item?.ClassifierEquipment?.equipment }
        })
        setData(newData)
      }, [typicalMalfunctions])

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
            {filteredTypicalMalfunctions.map(
              ({ typicalMalfunction, id, id_equipment }) => (
                <Item
                  name={typicalMalfunction}
                  comment={getEquipmentName(id_equipment as string)}
                  id={`${id}`}
                  groupChecked={false}
                  onChooseItems={onChooseItems}
                  key={id as string}
                />
              ),
            )}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбрана ни одна типовая неисправность!'}
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
