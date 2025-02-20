import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import {
  Box,
  ListItemText,
  ListItemButton,
  Modal,
  useTheme,
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton } from 'components/Buttons'
import {
  ClassifierEquipment,
  ClassifierModels,
} from 'store/slices/classifier/interfaces'
import { classifier, classifierComponent } from 'static/styles'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Models } from './Models'
import { ModalChangeName } from 'components/ModaQuestions'
import { ITheme } from 'themes/themeConfig'

export const Equipments = memo(
  ({
    equipment,
    id,
    ClassifierModels,
    TypicalMalfunctions,
  }: ClassifierEquipment) => {
    const [
      { activeEquipment },
      { setActiveEquipment, changeClassifierEquipment },
    ] = useClassifier()
    const modalRef = React.createRef()
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState<boolean>(false)
    const [modelData, setModelData] = useState<ClassifierModels[]>()
    const theme = useTheme() as ITheme

    const handleClick = () => {
      setOpen(!open)
      setActiveEquipment(id as string)
      setDataModels()
    }

    const editEquipment = (event: SyntheticEvent<EventTarget>) => {
      event.stopPropagation()
      setModal(true)
    }

    const changeEquipment = (answer: boolean, text: string) => {
      setModal(false)
      if (!answer) return
      changeClassifierEquipment({
        equipment: text,
        id: id as string,
      })
    }

    const setDataModels = () => {
      const data = ClassifierModels?.filter(
        item => item.id_equipment === id,
      ).map(item => {
        return { ...item, typicalModels: item.TypicalMalfunctions }
      })
      setModelData(data)
    }

    useEffect(() => {
      setDataModels()
    }, [ClassifierModels])

    useEffect(() => {
      if (activeEquipment !== id) {
        setOpen(false)
      }
    }, [activeEquipment])

    return (
      <Box sx={classifier}>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <ModalChangeName
            answer={changeEquipment}
            handleModal={setModal}
            ref={modalRef}
            question="Введите новое наименование классификатора"
            variant="h3"
          />
        </Modal>
        <ListItemButton
          divider={open}
          sx={classifierComponent}
          onClick={handleClick}>
          <ListItemText primary={equipment} />
          <EditButton handleClick={editEquipment} />
          <RotateButton open={open} handleClick={handleClick} />
        </ListItemButton>
        <Collapse
          sx={{ width: '100%', height: theme.fontSize === 'small' ? 40 : 50 }}
          in={open}
          timeout="auto"
          unmountOnExit>
          {modelData?.map(({ model, id, id_equipment, typicalModels }) => (
            <Models
              model={model}
              id_equipment={id_equipment}
              id={id as string}
              typicalModels={typicalModels}
              TypicalMalfunctions={TypicalMalfunctions}
              key={`${id_equipment}${id}`}
            />
          ))}
        </Collapse>
      </Box>
    )
  },
)
