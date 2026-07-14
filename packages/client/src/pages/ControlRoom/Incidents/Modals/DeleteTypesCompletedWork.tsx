import React, { memo } from 'react'
import { ChooseModalProps } from '../interfaces'
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
import { TypesCompletedWork } from 'store/slices/incidents/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteTypesCompletedWork = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { typesCompletedWork },
        { deleteTypesCompletedWork, getTypesCompletedWork },
      ] = useIncidents()
      const [selectedTypeCompletedWork, setSelectedTypeCompletedWork] =
        useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredTypesCompletedWork = useFilteredData<TypesCompletedWork>(
        typesCompletedWork,
        filterText,
        ['typeCompletedWork'],
      )

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedTypeCompletedWork.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteTypesCompletedWork(selectedTypeCompletedWork)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedTypeCompletedWork(
            selectedTypeCompletedWork.filter(value => value !== id),
          )
          return
        }
        setSelectedTypeCompletedWork([...selectedTypeCompletedWork, id])
        if ([...selectedTypeCompletedWork, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getTypesCompletedWork()
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
            {filteredTypesCompletedWork.map(({ typeCompletedWork, id }) => (
              <Item
                name={typeCompletedWork}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${typeCompletedWork}_${id}`}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один тип!'}
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
