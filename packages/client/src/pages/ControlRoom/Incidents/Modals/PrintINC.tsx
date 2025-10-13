import React, { memo, useRef } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, SyntheticEvent } from 'react'
import { Box, Typography } from '@mui/material'
import { modalStyle, boxDataModal } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import ReactToPrint from 'react-to-print'
import * as RTP from 'react-to-print'
import { printType } from '../data'
import { Normal, Compressed, XCompressed } from '../'

export const PrintINC = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [selectedType, setSelectedType] = useState<string>('normal')
      const contentToPrint = useRef(null)
      const handlePrint = RTP.useReactToPrint({
        documentTitle: 'Print This Document',
        removeAfterPrint: true,
        content: () => contentToPrint.current,
      })

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        handlePrint()
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (checked) {
          setSelectedType(id)
          return
        }
        if (!checked && id === selectedType) {
          setSelectedType(id)
          return
        }
        return
      }

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, pl: 5, height: 'auto', width: 'auto' }}
          component="form"
          onSubmit={changeData}>
          <Typography variant={'h4'}>{title}</Typography>
          <Box sx={{ ...boxDataModal, pl: 15, mt: 5, height: 'auto' }}>
            {printType.map(({ label, value }, index) => (
              <Item
                name={label}
                id={`${value}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                key={`${value}${index}` as string}
                initChecked={selectedType === value ? true : false}
                oneChecked={selectedType === value ? true : false}
                noEmpty={true}
              />
            ))}
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Печать"
          />
          <Box sx={{ textAlign: 'center' }} style={{ display: 'none' }}>
            <ReactToPrint content={() => contentToPrint.current} />
            <Box ref={contentToPrint} sx={{ textAlign: 'center' }}>
              {selectedType === 'normal' && <Normal />}
              {selectedType === 'compressed' && <Compressed />}
              {selectedType === 'xcompressed' && <XCompressed />}
            </Box>
          </Box>
        </Box>
      )
    },
  ),
)
