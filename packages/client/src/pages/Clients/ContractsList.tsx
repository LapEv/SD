import React, { useEffect, useState, memo, SyntheticEvent } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { EditButton, RotateButton } from 'components/Buttons'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'
import { ModalChangeName } from 'components/ModaQuestions'
import { ContractsPage } from 'store/slices/contracts/interfaces'
import { useContracts } from 'hooks/contracts/useContracts'
import { ContractPage } from './'
import { useAuth } from 'hooks/auth/useAuth'

export const ContractsList = memo(
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
    id_client,
    height,
  }: ContractsPage) => {
    const [{ admin }] = useAuth()
    const [{ activeContract }, { setActiveContract }] = useContracts()
    const [, { newContractName }] = useContracts()
    const modalRef = React.createRef()
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState<boolean>(false)

    const handleClick = () => {
      if (!open) {
        setActiveContract(id as string)
      }
      setOpen(!open)
    }

    const editContract = (event: SyntheticEvent<EventTarget>) => {
      event.stopPropagation()
      setModal(true)
    }

    const changeContractName = (answer: boolean, text: string) => {
      setModal(false)
      if (!answer) return
      newContractName({
        contract: text,
        id: id as string,
      })
    }

    useEffect(() => {
      if (activeContract !== id) {
        setOpen(false)
      }
    }, [activeContract])

    return (
      <Box sx={flexColumn_FS_SA}>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <ModalChangeName
            answer={changeContractName}
            handleModal={setModal}
            ref={modalRef}
            question="Введите новое наименование контракта"
          />
        </Modal>
        <ListItemButton
          divider={open}
          sx={{ ...classifierChildComponent, height }}
          onClick={handleClick}>
          <ListItemText primary={contract} sx={{ ml: 2 }} />
          {admin && <EditButton handleClick={editContract} />}
          <RotateButton open={open} />
        </ListItemButton>
        <Collapse
          sx={{ width: '100%', p: 2, pl: 5, pr: 5, height: 'auto' }}
          in={open}
          timeout="auto"
          unmountOnExit>
          <ContractPage
            contract={contract ?? ''}
            id={id ?? ''}
            number={number ?? ''}
            notificationEmail={notificationEmail ?? ''}
            date={date ?? ''}
            SLAs={SLAs}
            ClassifierEquipments={ClassifierEquipments}
            ClassifierModels={ClassifierModels}
            Objects={Objects}
            IncindentStatuses={IncindentStatuses}
            id_client={id_client}
          />
        </Collapse>
      </Box>
    )
  },
)
