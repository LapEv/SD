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
import { INCStatuses } from 'store/slices/incidents/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteIncidentStatus = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ incStatuses }, { deleteIncidentStatuses, getIncidentStatuses }] =
        useIncidents()
      const [selectedincStatuses, setSelectedincStatuses] = useState<string[]>(
        [],
      )
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredIncStatuses = useFilteredData<INCStatuses>(
        incStatuses,
        filterText,
        ['statusINC'],
      )

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedincStatuses.length) {
          setErrSelectedItems(true)
          return
        }
        handleModal(false)
        deleteIncidentStatuses(selectedincStatuses)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedincStatuses(
            selectedincStatuses.filter(value => value !== id),
          )
          return
        }
        setSelectedincStatuses([...selectedincStatuses, id])
        if (errSelectedItems && [...selectedincStatuses, id])
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getIncidentStatuses()
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
            {filteredIncStatuses.map(({ statusINC, id }) => (
              <Item
                name={statusINC}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${statusINC}_${id}`}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбран ни один статус!'}
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
