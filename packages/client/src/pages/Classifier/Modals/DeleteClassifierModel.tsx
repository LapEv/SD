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
import { ClassifierModels } from 'store/slices/classifier/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteClassifierModel = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { models, equipments },
        { deleteClassifierModel, getClassifierModels },
      ] = useClassifier()
      const [selectedModels, setSelectedModels] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [data, setData] = useState<ClassifierModels[]>([])
      const [filterText, setFilterText] = useState<string>('')
      const filteredModels = useFilteredData<ClassifierModels>(
        data,
        filterText,
        ['model', 'equipment'],
      )

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedModels.length) {
          setErrSelectedItems(true)
          return
        }
        deleteClassifierModel(selectedModels)
        handleModal(false)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedModels(selectedModels.filter(value => value !== id))
          return
        }
        setSelectedModels([...selectedModels, id])
        if ([...selectedModels, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getClassifierModels()
      }, [])

      const getEquipmentName = (id_equipment: string) => {
        return equipments.find(item => item.id === id_equipment)?.equipment
      }

      const setText = (text: string) => {
        setFilterText(text)
      }

      useEffect(() => {
        const newData = models.map(item => {
          return { ...item, equipment: item?.ClassifierEquipment?.equipment }
        })
        setData(newData)
      }, [models])

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
            {filteredModels.map(({ model, id, id_equipment }) => (
              <Item
                name={model}
                comment={getEquipmentName(id_equipment as string)}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={id as string}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни одна модель!'}
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
