import React, { memo, useEffect, useState } from 'react'
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemText,
  Modal,
  useTheme,
} from '@mui/material'
import { IconPopoverButton, RotateButton } from 'components/Buttons'
import { Item } from 'components/CheckBoxGroup'
import { classifierChild2Component, popoverIcon } from 'static/styles'
import { DataList } from 'components/CheckBoxGroup/interface'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useObjects } from 'hooks/objects/useObjects'
import { AddObject } from './Modals'
import { SearchIconElement } from 'components/Icons'
import { ModalTitles } from './data'
import { IObjectList } from './interfaces'
import { ITheme } from 'themes/themeConfig'

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
    const theme = useTheme() as ITheme

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
      <Box sx={{ width: '95%', mt: 1 }}>
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
          sx={{
            ...classifierChild2Component,
            height: theme.fontSize === 'small' ? 30 : 40,
          }}
          onClick={openObjectList}>
          <ListItemText primary={'Объекты'} sx={{ ml: 2 }} />
          <RotateButton open={openObject} />
        </ListItemButton>
        <Collapse
          sx={{ width: '100%', p: 2, pl: 5, pr: 5 }}
          in={openObject}
          timeout="auto"
          unmountOnExit>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: theme.fontSize === 'small' ? 30 : 40,
              mt: 1,
            }}>
            <TextField
              variant="outlined"
              sx={{
                width: '90%',
                mt: 2,
                height: theme.fontSize === 'small' ? 30 : 40,
              }}
              label="Введите фильтр"
              margin="normal"
              value={filterText || ''}
              onChange={e => setFilterText(e.target.value ?? '')}
              InputProps={{
                endAdornment: <SearchIconElement />,
              }}
            />
            {admin && (
              <IconPopoverButton
                popover={'Добавить объект'}
                onClick={AddNewObject}
                icon={<AddCircleOutlineIcon />}
                propsPopover={{ ml: -1 }}
                sx={{
                  ...popoverIcon,
                  width: theme.fontSize === 'small' ? 30 : 40,
                  height: theme.fontSize === 'small' ? 30 : 40,
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              maxHeight: '35vH',
              overflowX: 'hidden',
              overflowY: 'auto',
              height: 'auto',
              mt: 2,
            }}>
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
          </Box>
        </Collapse>
      </Box>
    )
  },
)
