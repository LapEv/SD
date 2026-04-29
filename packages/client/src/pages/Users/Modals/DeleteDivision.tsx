import React, { ChangeEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Typography } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { useFilteredData } from 'hooks/useFilteredData'
import { Division } from 'store/slices/structure/interfaces'
import { TextField } from 'components/TextFields'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteDivision = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ divisions }, { deleteDivision, getDivisions }] = useStructure()
      const [selectedDivisions, setSelectedDivisions] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredDivisions = useFilteredData<Division>(
        divisions,
        filterText,
        ['divisionName', 'division'],
      )

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedDivisions.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteDivision(selectedDivisions)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedDivisions(selectedDivisions.filter(value => value !== id))
          return
        }
        setSelectedDivisions([...selectedDivisions, id])
        if ([...selectedDivisions, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getDivisions()
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
            {filteredDivisions.map(({ divisionName, division, id }) => (
              <Item
                name={divisionName}
                comment={division}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${divisionName}_${id}`}
                className={'listItemsChangeRolesGr'}
                classItemText={'listItemsTextContainer'}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один дивизион!'}
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
