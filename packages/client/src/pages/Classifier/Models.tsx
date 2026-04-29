import React, { useEffect, useState, memo, SyntheticEvent } from 'react'
import { ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import {
  ButtonsSectionNoSubmit,
  EditButton,
  RotateButton,
} from 'components/Buttons'
import {
  ClassifierModels,
  TypicalMalfunctions,
} from 'store/slices/classifier/interfaces'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { ModalChangeName } from 'components/ModaQuestions'
import { isEqualArrObjects } from 'utils/isEqualArrObjects'
import { MuiDiv } from 'components/MUI'

export const Models = memo(
  ({ model, id, typicalModels, TypicalMalfunctions }: ClassifierModels) => {
    const [{ activeModel }, { setActiveModel, changeClassifierModel }] =
      useClassifier()
    const modalRef = React.createRef()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState<DataList[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [selectedTypicalMalfunction, setSelectedTypicalMalfunction] =
      useState<TypicalMalfunctions[]>(typicalModels as [])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)

    const handleClick = () => {
      if (!open) {
        setActiveModel(id as string)
      }
      setOpen(!open)
    }

    const onChangeModels = () => {
      if (errSelectedItems) return
      changeClassifierModel({
        model,
        id: id as string,
        selectedTypicalMalfunctions: selectedTypicalMalfunction.map(
          ({ id }) => id,
        ) as string[],
      })
      setDisabled(true)
    }

    const undoChanges = () => {
      const listData = TypicalMalfunctions?.map(item => {
        return {
          name: item.typicalMalfunction,
          id: item.id as string,
          initChecked: typicalModels?.find(value => item.id === value.id)
            ? true
            : false,
        }
      }) as DataList[]
      setData(listData)
      setSelectedTypicalMalfunction(typicalModels as TypicalMalfunctions[])
      setDisabled(true)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (checked) {
        const modelList = [...selectedTypicalMalfunction]
        const newModel = TypicalMalfunctions?.find(
          item => item.id === id,
        ) as TypicalMalfunctions
        modelList.push(newModel)
        const isEq = isEqualArrObjects(
          typicalModels as [],
          modelList as [],
          'id',
        )
        const listData = data.map(item => {
          if (item.id === id) {
            return { ...item, initChecked: true }
          }
          return item
        }) as []
        setData(listData)
        setDisabled(isEq)
        setSelectedTypicalMalfunction([...selectedTypicalMalfunction, newModel])
        setErrSelectedItems(false)
        return
      }
      const newModelList = selectedTypicalMalfunction?.filter(
        item => item.id !== id,
      )
      const isEq = isEqualArrObjects(
        typicalModels as [],
        newModelList as [],
        'id',
      )
      const listData = data.map(item => {
        if (item.id === id) {
          return { ...item, initChecked: false }
        }
        return item
      }) as []
      setData(listData)
      setDisabled(isEq)
      setSelectedTypicalMalfunction(newModelList)
      if (!newModelList || !newModelList.length) {
        setErrSelectedItems(true)
        setDisabled(true)
      }
    }

    useEffect(() => {
      const listData = TypicalMalfunctions?.map(item => {
        return {
          name: item.typicalMalfunction,
          id: item.id as string,
          initChecked: typicalModels?.find(value => item.id === value.id)
            ? true
            : false,
        }
      }) as DataList[]
      setData(listData)
    }, [])

    const editModel = (event: SyntheticEvent<EventTarget>) => {
      event.stopPropagation()
      setModal(true)
    }

    const changeModel = (answer: boolean, text: string) => {
      setModal(false)
      if (!answer) return
      changeClassifierModel({
        model: text,
        id: id as string,
      })
    }

    useEffect(() => {
      if (activeModel !== id) {
        setOpen(false)
      }
    }, [activeModel])

    return (
      <MuiDiv className={'flexColumn'}>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <ModalChangeName
            answer={changeModel}
            handleModal={setModal}
            ref={modalRef}
            question="Введите новое наименование модели"
            variant="h3"
          />
        </Modal>
        <ListItemButton
          divider={open}
          className={'itemButtonCollapse'}
          onClick={handleClick}>
          <ListItemText primary={model} sx={{ ml: 2 }} />
          <EditButton handleClick={editModel} />
          <RotateButton open={open} />
        </ListItemButton>
        <Collapse
          className={'collapseList collapseList_p'}
          in={open}
          timeout="auto"
          unmountOnExit>
          {data.map(({ name, id, initChecked }) => (
            <Item
              name={name}
              id={`${id}`}
              groupChecked={null}
              onChooseItems={onChooseItems}
              initChecked={initChecked}
              key={id as string}
            />
          ))}
          <MuiDiv className={'modalErrorML5'}>
            {errSelectedItems &&
              'Модель не может быть без типовых неисправностей!'}
          </MuiDiv>
          <ButtonsSectionNoSubmit
            btnHandle={onChangeModels}
            btnSecondHandle={undoChanges}
            btnName="Сохранить"
            btnDisabled={disabled}
            btnSecondName="Отменить"
            btnSecondDisabled={disabled}
          />
        </Collapse>
      </MuiDiv>
    )
  },
)
