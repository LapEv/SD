import React, { memo, useState, useEffect, DragEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsSectionNoSubmit } from 'components/Buttons'
import { useIncidents } from 'hooks/incidents/useINC'
import { ChooseModalProps } from './interfaces'
import { ITheme, ThemeMode } from 'themes/themeConfig'
import { boxMenuDnD } from 'static/styles/modals'
import { INCStatuses } from 'store/slices/incidents/interfaces'

export const ChangeStateStatuses = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      // const theme = useTheme()
      const [
        { incStatuses },
        { changeStateIncidentStatuses, getIncidentStatuses },
      ] = useIncidents()
      const [draggingItem, setDraggingItem] = useState<INCStatuses | null>(null)
      const [items, setItems] = useState<INCStatuses[]>()
      const theme = useTheme()

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
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5, pb: 10 }}>
          <Typography variant={'h6'}>{title}</Typography>
          <Box
            sx={{
              width: '100%',
              pb: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {items?.map(item => (
              <Box
                key={item.id}
                sx={{
                  ...boxMenuDnD,
                  cursor:
                    item.stateNumber > 0 &&
                    item.stateNumber < incStatuses.length
                      ? 'pointer'
                      : 'default',
                  backgroundColor:
                    theme.palette.mode === ThemeMode.light
                      ? (theme as ITheme).colorTheme.colorDark
                      : (theme as ITheme).colorTheme.colorLight,
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? item.stateNumber > 0 &&
                        item.stateNumber < incStatuses.length
                        ? '#FFFFFF'
                        : '#FFFFFF82'
                      : item.stateNumber > 0 &&
                          item.stateNumber < incStatuses.length
                        ? '#000000'
                        : '#00000082',
                }}
                className={`item ${item === draggingItem ? 'dragging' : ''}`}
                draggable={
                  item.stateNumber > 0 && item.stateNumber < incStatuses.length
                    ? true
                    : false
                }
                onDragStart={e => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(item)}>
                {item.statusINC}
              </Box>
            ))}
          </Box>
          <ButtonsSectionNoSubmit
            btnHandle={changeData}
            btnSecondHandle={() => handleModal(false)}
            btnName="Сохранить"
            btnSecondName="Отменить"
            btnDisabled={false}
            btnSecondDisabled={false}
          />
        </Box>
      )
    },
  ),
)
