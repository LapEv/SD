import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import {
  Box,
  ListItemText,
  ListItemButton,
  Modal,
  useTheme,
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton, IconPopoverButton } from 'components/Buttons'
import { classifier, classifierComponent } from 'static/styles'
import { ModalChangeName } from 'components/ModaQuestions'
import { useClients } from 'hooks/clients/useClients'
import { Clients } from 'store/slices/clients/interfaces'
import { useContracts } from 'hooks/contracts/useContracts'
import { ContractsList } from './'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { AddContract } from './Modals'
import { ModalTitles } from './data'
import { popoverIcon } from 'static/styles'
import { ITheme } from 'themes/themeConfig'

export const ClientsList = memo(({ client, legalName, id }: Clients) => {
  const [{ activeClient }, { setActiveClient, changeClient }] = useClients()
  const [{ contracts }, { getContractsByClientID }] = useContracts()
  const [{ admin }] = useAuth()
  const modalRef = React.createRef()
  const [open, setOpen] = useState(false)
  const theme = useTheme() as ITheme

  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  const handleClick = () => {
    setOpen(!open)
    setActiveClient(id as string)
    getContractsByClientID(id as string)
  }

  const changeClientName = (answer: boolean, text: string) => {
    setModal(false)
    if (!answer) return
    changeClient({
      client: text,
      legalName,
      id: id as string,
    })
  }

  useEffect(() => {
    if (activeClient !== id) {
      setOpen(false)
    }
  }, [activeClient])

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  const editClient = (event: SyntheticEvent<EventTarget>) => {
    event.stopPropagation()
    setModal(true)
    setModalImage('')
  }

  const AddNewContract = () => {
    setModal(true)
    setModalImage('newContract')
  }

  return (
    <Box sx={classifier}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        {modalImage ? (
          <AddContract
            ref={modalRef}
            handleModal={handleModal}
            title={ModalTitles.newContract}
          />
        ) : (
          <ModalChangeName
            answer={changeClientName}
            handleModal={handleModal}
            ref={modalRef}
            question="Введите новое наименование клиента"
          />
        )}
      </Modal>
      <ListItemButton
        divider={open}
        sx={{
          ...classifierComponent,
          height: theme.fontSize === 'small' ? 40 : 50,
        }}
        onClick={handleClick}>
        <ListItemText primary={client} secondary={legalName} />
        {admin && <EditButton handleClick={editClient} />}
        <RotateButton open={open} handleClick={handleClick} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {contracts.map(
          ({
            contract,
            id,
            number,
            notificationEmail,
            date,
            SLAs,
            ClassifierEquipments,
            ClassifierModels,
            Objects,
            IncindentStatuses,
          }) => (
            <ContractsList
              contract={contract}
              id={id as string}
              number={number}
              notificationEmail={notificationEmail}
              date={date}
              SLAs={SLAs}
              ClassifierEquipments={ClassifierEquipments}
              ClassifierModels={ClassifierModels}
              Objects={Objects}
              IncindentStatuses={IncindentStatuses}
              id_client={id as string}
              key={id}
              height={theme.fontSize === 'small' ? 40 : 50}
            />
          ),
        )}
        {admin && (
          <IconPopoverButton
            popover={'Создать контракт'}
            onClick={AddNewContract}
            icon={<AddCircleOutlineIcon />}
            propsPopover={{ ml: -1 }}
            sx={{
              ...popoverIcon,
              mt: 1,
              width: theme.fontSize === 'small' ? 30 : 40,
              height: theme.fontSize === 'small' ? 30 : 40,
            }}
          />
        )}
      </Collapse>
    </Box>
  )
})
