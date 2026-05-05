import React, { memo, useState, useEffect, DragEvent } from 'react'
import { Typography } from '@mui/material'
import { ButtonsSectionNoSubmit } from 'components/Buttons'
import { useIncidents } from 'hooks/incidents/useINC'
import { ChooseModalProps } from '../interfaces'
import { INCStatuses } from 'store/slices/incidents/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const ChangeStateStatuses = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { incStatuses },
        { changeStateIncidentStatuses, getIncidentStatuses },
      ] = useIncidents()
      const [draggingItem, setDraggingItem] = useState<INCStatuses | null>(null)
      const [items, setItems] = useState<INCStatuses[]>()

      useEffect(() => {
        getIncidentStatuses()
      }, [])

      useEffect(() => {
        setItems(incStatuses)
      }, [incStatuses])

      const handleDragStart = (
        e: DragEvent<HTMLDivElement>,
        item: INCStatuses,
      ) => {
        setDraggingItem(item)
        e.dataTransfer.setData('text/plain', '')
      }

      const handleDragEnd = () => {
        setDraggingItem(null)
      }

      const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
      }

      const handleDrop = (targetItem: INCStatuses) => {
        if (!draggingItem) return

        const currentIndex = items?.indexOf(draggingItem) as number
        const targetIndex = items?.indexOf(targetItem) as number
        if (targetIndex <= 0 || targetIndex >= (items?.length as number) - 1)
          return
        const arr = [...new Set(items)]
        arr?.splice(currentIndex, 1)
        arr?.splice(targetIndex, 0, draggingItem)
        const newState = arr.map((item, index) => {
          const newObj = { ...item }
          newObj.stateNumber = index + 1
          return newObj
        })
        setItems(newState)
      }

      const changeData = () => {
        changeStateIncidentStatuses(items as INCStatuses[])
        handleModal(false)
      }

      return (
        <BoxModal ref={ref} tabIndex={-1} className={'modalMainContainer'}>
          <Typography variant={'h1'}>{title}</Typography>
          <MuiDiv className={'boxModalContainer'}>
            {items?.map(item => (
              <MuiDiv
                key={`${item.statusINC}${item.id}`}
                className={`item ${item === draggingItem ? 'dragging' : ''} incStatusesContainer ${item.stateNumber === 1 || item.stateNumber === incStatuses.length ? 'noDraggingINCStatuses' : ''}`}
                draggable={
                  item.stateNumber === 1 ||
                  item.stateNumber === incStatuses.length
                    ? false
                    : true
                }
                onDragStart={e => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(item)}>
                {item.statusINC}
              </MuiDiv>
            ))}
          </MuiDiv>
          <ButtonsSectionNoSubmit
            btnHandle={changeData}
            btnSecondHandle={() => handleModal(false)}
            btnName="Сохранить"
            btnSecondName="Отменить"
            btnDisabled={false}
            btnSecondDisabled={false}
            containerProps={{ mt: '16px!important' }}
          />
        </BoxModal>
      )
    },
  ),
)
