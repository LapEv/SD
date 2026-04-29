import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import { Collapse, ListItemButton, ListItemText, Modal } from '@mui/material'
import {
  ClearSearchModalSection,
  IconPopoverButton,
  RotateButton,
} from 'components/Buttons'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useObjects } from 'hooks/objects/useObjects'
import { AddObject } from './Modals'
import { ModalTitles } from './data'
import { IObjectList } from './interfaces'
import { MuiDiv } from 'components/MUI'

export const ContractObjectList = memo(
  ({ objectID, onChooseItems }: IObjectList) => {
    const modalRef = React.createRef()
    const [modal, setModal] = useState<boolean>(false)
    const [{ admin }] = useAuth()
    const [{ objects }, { getObjects }] = useObjects()
    const [objectsData, setObjectsData] = useState<DataList[]>([])
    const [openObject, setOpenObject] = useState(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredData = useFilteredData<DataList>(objectsData, filterText, [
      'name',
    ])

    const openObjectList = () => {
      setOpenObject(!openObject)
      getObjects()
    }

    useEffect(() => {
      const listData = objects.map(({ object, id }) => {
        return {
          name: object,
          id: id as string,
          initChecked: objectID?.find(item => item === id) ? true : false,
        }
      })
      setObjectsData(listData)
    }, [objects, objectID])

    const AddNewObject = () => {
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
          <AddObject
            ref={modalRef}
            handleModal={handleModal}
            title={ModalTitles.newObject}
          />
        </Modal>
        <ListItemButton
          divider={openObject}
          className={'itemContainerLabel'}
          onClick={openObjectList}>
          <ListItemText primary={'Объекты'} sx={{ ml: 2 }} />
          <RotateButton open={openObject} />
        </ListItemButton>
        <Collapse
          className={'collapseList collapseList_p'}
          in={openObject}
          timeout="auto"
          unmountOnExit>
          <MuiDiv className={'boxList_flexSC'}>
            <TextField
              variant="outlined"
              className={'textContainer_w90_mt2'}
              label="Введите фильтр"
              margin="normal"
              value={filterText || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value ?? '')
              }
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
            {admin && (
              <IconPopoverButton
                popover={'Добавить объект'}
                onClick={AddNewObject}
                icon={<AddCircleOutlineIcon />}
                propsPopover={{ ml: -1 }}
                className={'addIconButton'}
              />
            )}
          </MuiDiv>
          <MuiDiv className={'listViewColumn'}>
            {filteredData?.map(({ name, id, initChecked, comment }) => (
              <Item
                name={name}
                props={{ ml: 2 }}
                id={`${id}`}
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
  },
)
