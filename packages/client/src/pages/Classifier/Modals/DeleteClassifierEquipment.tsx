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
import { useClassifier } from 'hooks/classifier/useClassifier'
import { ClassifierEquipment } from 'store/slices/classifier/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteClassifierEquipment = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { equipments },
        { deleteClassifierEquipment, getClassifierEquipments },
      ] = useClassifier()
      const [selectedDivisions, setSelectedDivisions] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredEquipments = useFilteredData<ClassifierEquipment>(
        equipments,
        filterText,
        ['equipment'],
      )
      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedDivisions.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteClassifierEquipment(selectedDivisions)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedDivisions(selectedDivisions.filter(value => value !== id))
          return
        }
        setSelectedDivisions([...selectedDivisions, id])
        if (errSelectedItems) setErrSelectedItems(false)
      }

      useEffect(() => {
        getClassifierEquipments()
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
            {filteredEquipments.map(({ equipment, id }) => (
              <Item
                name={equipment}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${equipment}_${id}`}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один классификатор!'}
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
