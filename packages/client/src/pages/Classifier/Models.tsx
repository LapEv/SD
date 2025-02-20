import React, { useEffect, useState, memo, SyntheticEvent } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import {
  ButtonsSectionNoSubmit,
  EditButton,
  RotateButton,
} from 'components/Buttons'
import { useTheme } from '@mui/material/styles'
import {
  ClassifierModels,
  TypicalMalfunctions,
} from 'store/slices/classifier/interfaces'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { ModalChangeName } from 'components/ModaQuestions'
import { isEqualArrObjects } from 'utils/isEqualArrObjects'
import { ITheme } from 'themes/themeConfig'

export const Models = memo(
  ({ model, id, typicalModels, TypicalMalfunctions }: ClassifierModels) => {
    const [{ activeModel }, { setActiveModel, changeClassifierModel }] =
      useClassifier()
    const theme = useTheme() as ITheme
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
      <Box sx={flexColumn_FS_SA}>
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
          sx={classifierChildComponent}
          onClick={handleClick}>
          <ListItemText primary={model} sx={{ ml: 2 }} />
          <EditButton handleClick={editModel} />
          <RotateButton open={open} />
        </ListItemButton>
        <Collapse
          sx={{
            width: '100%',
            p: 2,
            pl: 5,
            pr: 5,
            height: theme.fontSize === 'small' ? 40 : 50,
          }}
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
          <Box sx={{ color: theme.palette.error.main, height: 20, ml: 5 }}>
            {errSelectedItems &&
              'Модель не может быть без типовых неисправностей!'}
          </Box>
          <ButtonsSectionNoSubmit
            btnHandle={onChangeModels}
            btnSecondHandle={undoChanges}
            btnName="Сохранить"
            btnDisabled={disabled}
            btnSecondName="Отменить"
            btnSecondDisabled={disabled}
          />
        </Collapse>
      </Box>
    )
  },
)
