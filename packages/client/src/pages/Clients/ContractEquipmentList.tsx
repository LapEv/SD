import React, { memo, useEffect, useState } from 'react'
import { Collapse, ListItemButton, ListItemText, Modal } from '@mui/material'
import { IconPopoverButton, RotateButton } from 'components/Buttons'
import { CheckBoxGroups } from 'components/CheckBoxGroup'
import { ICheckBoxGroupData } from 'components/CheckBoxGroup/interface'
import { filterFirstElement } from './Modals/data'
import { SelectMUI } from 'components/Select'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { useFilteredData } from 'hooks/useFilteredData'
import { SwitchToClassifierPage } from './'
import { IEquipmentList } from './interfaces'
import { MuiDiv } from 'components/MUI'

export const ContractEquipmentList = memo(
  ({
    equipmentID,
    modelID,
    onChooseGroup,
    onChooseItems,
    clearChanges,
    onClearChanges,
  }: IEquipmentList) => {
    const modalRef = React.createRef()
    const [modal, setModal] = useState<boolean>(false)
    const [{ admin }] = useAuth()
    const [{ equipments }, { getClassifierEquipments }] = useClassifier()
    const [equipmentList, setEquipmentList] = useState<ICheckBoxGroupData[]>([])
    const [openEquipment, setOpenEquipment] = useState(false)
    const [filterList, setFilterList] = useState<string[]>([])
    const [filterText, setFilterText] = useState<string>('')
    const [selectedFilter, setSelectedFilter] =
      useState<string>(filterFirstElement)
    const filteredData = useFilteredData<ICheckBoxGroupData>(
      equipmentList,
      filterText,
      ['group'],
    )

    const openEquipmentList = () => {
      setOpenEquipment(!openEquipment)
      getClassifierEquipments()
    }

    useEffect(() => {
      const listData = equipments.map(({ equipment }) => equipment)
      listData.unshift(filterFirstElement)
      setFilterList(listData)
      const data = equipments.map(({ equipment, id, ClassifierModels }) => {
        return {
          id: id as string,
          group: equipment,
          checkedGroup: equipmentID
            ? equipmentID.includes(id as string)
            : false,
          items: ClassifierModels?.map(({ model, id }) => {
            return {
              item: model,
              id: id as string,
              checkedItems: modelID ? modelID.includes(id as string) : '',
            }
          }) as [],
        }
      })
      setEquipmentList(data)
    }, [equipments, equipmentID])

    const changeFilter = (text: string) => {
      setFilterText(text === filterFirstElement ? '' : text)
      setSelectedFilter(text)
    }

    const AddNewEquipment = () => {
      setModal(true)
    }

    const handleModal = (bool: boolean) => {
      setModal(bool)
    }

    return (
      <MuiDiv className={'flexColumn'}>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <SwitchToClassifierPage
            ref={modalRef}
            handleModal={handleModal}
            title={
              'Вы действительно перейти на страницу создания классифиактора? Все ваши внесенные изменения не сохранятся! Сохраните их сейчас и продолжите настройку позже!'
            }
          />
        </Modal>
        <ListItemButton
          divider={openEquipment}
          className={'itemContainerLabel'}
          onClick={openEquipmentList}>
          <ListItemText primary={'Классификатор оборудования'} sx={{ ml: 2 }} />
          <RotateButton open={openEquipment} />
        </ListItemButton>
        <Collapse
          className={'collapseList collapseList_p'}
          in={openEquipment}
          timeout="auto"
          unmountOnExit>
          <MuiDiv className={'boxList_flexSC'}>
            <SelectMUI
              data={filterList}
              onChange={changeFilter}
              value={selectedFilter || filterFirstElement}
              label="Выберите фильтр"
              defaultData="Все"
            />
            {admin && (
              <IconPopoverButton
                popover={'Добавить классификатор'}
                onClick={AddNewEquipment}
                icon={<AddCircleOutlineIcon />}
                propsPopover={{ ml: -1 }}
                className={'addIconButton'}
              />
            )}
          </MuiDiv>
          <MuiDiv className={'listViewColumn'}>
            <CheckBoxGroups
              data={filteredData}
              onChooseGroup={onChooseGroup}
              onChooseItems={onChooseItems}
              startDataGroups={equipmentID}
              startDataItems={modelID}
              clearChanges={clearChanges}
              onClearChanges={onClearChanges}
            />
          </MuiDiv>
        </Collapse>
      </MuiDiv>
    )
  },
)
