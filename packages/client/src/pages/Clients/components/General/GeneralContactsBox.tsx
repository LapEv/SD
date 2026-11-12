import { Collapse, ListItemButton, ListItemText, Modal } from '@mui/material'
import {
  ClearSearchModalSection,
  IconPopoverButton,
  RotateButton,
} from 'components/Buttons'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { IGeneralContactBox } from 'pages/Clients/interfaces'
import { ChangeEvent, createRef, useState } from 'react'
import { GeneralContact } from './GeneralContact'
import { MuiDiv } from 'components/MUI'
import { NewContact } from 'pages/Clients/Modals'
import { menuFilterActive, ModalTitles } from 'pages/Clients/data'
import { useAuth } from 'hooks/auth/useAuth'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { IClientContact } from 'store/slices/clients/interfaces'
import { SelectMUI } from 'components/Select'

export const GeneralContactsBox = ({
  clientData,
  clearContacts,
  setClearContacts,
  openContactsBox,
  setOpenContactsBox,
}: IGeneralContactBox) => {
  const [{ admin }] = useAuth()
  const modalRef = createRef()
  const [modal, setModal] = useState<boolean>(false)
  const [filterText, setFilterText] = useState<string>('')
  const [selectedFilter, setSelectedFilter] = useState<string>(
    menuFilterActive[1],
  )
  const filtered = useFilteredData<IClientContact>(
    clientData.Contacts as IClientContact[],
    filterText,
    ['lastName', 'firstName', 'post'],
  )

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  return (
    <>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <NewContact
          ref={modalRef}
          handleModal={handleModal}
          title={ModalTitles.newContact}
          id_client={clientData.id as string}
        />
      </Modal>
      <ListItemButton
        divider={openContactsBox}
        className={'itemClientContainerLabel'}
        onClick={setOpenContactsBox}>
        <ListItemText primary={'Контакты'} sx={{ ml: 2 }} />
        <RotateButton open={openContactsBox} />
      </ListItemButton>
      <Collapse
        className={'collapseList collapseList_p_Contacts'}
        in={openContactsBox}
        timeout="auto"
        unmountOnExit>
        <MuiDiv className={'boxList_flexSC_Contacts'}>
          <TextField
            variant="outlined"
            className={'textContainer_w50'}
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
          <SelectMUI
            data={menuFilterActive}
            onChange={text => setSelectedFilter(text)}
            value={selectedFilter || menuFilterActive[1]}
            label="Выберите фильтр статуса контакта "
            defaultData="Все"
          />
          {admin && (
            <IconPopoverButton
              className={'addIconButton contactAddIconButton'}
              popover={'Добавить контакт'}
              onClick={() => setModal(true)}
              icon={<AddCircleOutlineIcon />}
              propsPopover={{ ml: 0.5 }}
              horizontal={'right'}
              horizontal2={'left'}
            />
          )}
        </MuiDiv>
        <MuiDiv sx={{ mt: 2 }}>
          {filtered &&
            filtered.length > 0 &&
            filtered.map((item, index) => {
              if (
                selectedFilter === 'Все' ||
                (selectedFilter === 'Активные' && item.active === true) ||
                (selectedFilter === 'Неактивные' && item.active === false)
              ) {
                return (
                  <GeneralContact
                    clientData={clientData}
                    contact={item}
                    clearContacts={clearContacts}
                    setClearContacts={setClearContacts}
                    index={index}
                    key={`contacts_${index}`}
                  />
                )
              }
            })}
        </MuiDiv>
      </Collapse>
    </>
  )
}
