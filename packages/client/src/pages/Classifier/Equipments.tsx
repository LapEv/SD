import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import { ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton } from 'components/Buttons'
import {
  ClassifierEquipment,
  ClassifierModels,
} from 'store/slices/classifier/interfaces'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Models } from './Models'
import { ModalChangeName } from 'components/ModaQuestions'
import { MuiDiv } from 'components/MUI'

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
      <MuiDiv className={'containerCollapse'}>
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
          className={'itemButtonCollapse1'}
          onClick={handleClick}>
          <ListItemText primary={equipment} />
          <EditButton handleClick={editEquipment} />
          <RotateButton open={open} handleClick={handleClick} />
        </ListItemButton>
        <Collapse
          className={'collapseList'}
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
      </MuiDiv>
    )
  },
)
