import React, { memo } from 'react'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { useFilteredData } from 'hooks/useFilteredData'
import { TextField } from 'components/TextFields'
import { useIncidents } from 'hooks/incidents/useINC'
import { TypesOfWork } from 'store/slices/incidents/interfaces'
import { ChooseModalProps } from '../interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteTypesOfWork = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ typesOfWork }, { deleteTypesOfWork, getTypesOfWork }] =
        useIncidents()
      const [selectedTypesOfWork, setSelectedTypesOfWork] = useState<string[]>(
        [],
      )
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredTypesOfWork = useFilteredData<TypesOfWork>(
        typesOfWork,
        filterText,
        ['typeOfWork'],
      )

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedTypesOfWork.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteTypesOfWork(selectedTypesOfWork)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedTypesOfWork(
            selectedTypesOfWork.filter(value => value !== id),
          )
          return
        }
        setSelectedTypesOfWork([...selectedTypesOfWork, id])
        if ([...selectedTypesOfWork, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getTypesOfWork()
      }, [])

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
            onChange={e => setFilterText(e.target.value ?? '')}
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
          <MuiDiv className={'boxDataModal h35Vh'}>
            {filteredTypesOfWork.map(({ typeOfWork, id }) => (
              <Item
                name={typeOfWork}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${typeOfWork}_${id}`}
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
