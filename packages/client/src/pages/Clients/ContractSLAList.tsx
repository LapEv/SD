import React, { memo, useEffect, useState } from 'react'
import { Collapse, ListItemButton, ListItemText, Modal } from '@mui/material'
import { IconPopoverButton, RotateButton } from 'components/Buttons'
import { useSLA } from 'hooks/sla/useSLA'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { filterFirstElement } from './Modals/data'
import { SelectMUI } from 'components/Select'
import { useFilteredData } from 'hooks/useFilteredData'
import { useAuth } from 'hooks/auth/useAuth'
import { NewSLA } from 'pages/ServiceLevel/Modals'
import { ModalTitles } from 'pages/ServiceLevel/data'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useIncidents } from 'hooks/incidents/useINC'
import { ISLAList } from './interfaces'
import { MuiDiv } from 'components/MUI'

export const ContractSLAList = memo(({ slaID, onChooseItems }: ISLAList) => {
  const modalRef = React.createRef()
  const [modal, setModal] = useState<boolean>(false)
  const [{ admin }] = useAuth()
  const [{ typesOfWork }, { getTypesOfWork }] = useIncidents()
  const [{ sla }, { getSLA }] = useSLA()
  const [slaData, setSLAData] = useState<DataList[]>([])
  const [openSLA, setOpenSLA] = useState(false)
  const [filterList, setFilterList] = useState<string[]>([])
  const [filterText, setFilterText] = useState<string>('')
  const [selectedFilter, setSelectedFilter] =
    useState<string>(filterFirstElement)
  const filteredData = useFilteredData<DataList>(slaData, filterText, [
    'comment',
  ])

  const openSLAList = () => {
    setOpenSLA(!openSLA)
    getSLA()
    getTypesOfWork()
  }

  useEffect(() => {
    const listData = sla.map(({ sla, id, TypesOfWork }) => {
      return {
        name: sla,
        id: id as string,
        comment: TypesOfWork.typeOfWork,
        initChecked: slaID?.find(item => item === id) ? true : false,
      }
    })
    setSLAData(listData)
  }, [sla, slaID])

  useEffect(() => {
    const listData = typesOfWork.map(({ typeOfWork }) => typeOfWork)
    listData.unshift(filterFirstElement)
    setFilterList(listData)
  }, [typesOfWork])

  const changeFilter = (text: string) => {
    setFilterText(text === filterFirstElement ? '' : text)
    setSelectedFilter(text)
  }

  const AddNewSLA = () => {
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
        <NewSLA
          ref={modalRef}
          handleModal={handleModal}
          title={ModalTitles.newSLA}
        />
      </Modal>
      <ListItemButton
        divider={openSLA}
        className={'itemContainerLabel'}
        onClick={openSLAList}>
        <ListItemText primary={'Уровни сервиса'} sx={{ ml: 2 }} />
        <RotateButton open={openSLA} />
      </ListItemButton>
      <Collapse
        className={'collapseList collapseList_p'}
        in={openSLA}
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
              className={'addIconButton'}
              popover={'Добавить уровень сервиса'}
              onClick={AddNewSLA}
              icon={<AddCircleOutlineIcon />}
              propsPopover={{ ml: -1 }}
            />
          )}
        </MuiDiv>
        <MuiDiv className={'listViewColumn'}>
          {filteredData?.map(({ name, id, initChecked, comment }) => (
            <Item
              name={name}
              id={`${id}`}
              props={{ ml: 2 }}
              comment={comment}
              groupChecked={null}
              onChooseItems={onChooseItems}
              initChecked={initChecked}
              key={id as string}
            />
          ))}
        </MuiDiv>
      </Collapse>
    </MuiDiv>
  )
})
