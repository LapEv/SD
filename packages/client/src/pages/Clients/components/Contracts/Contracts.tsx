import { Collapse, ListItemButton, ListItemText } from '@mui/material'
import { RotateButton, IconPopoverButton } from 'components/Buttons'
import { MuiDiv } from 'components/MUI'
import { useAuth } from 'hooks/auth/useAuth'
import { useContracts } from 'hooks/contracts/useContracts'
import { memo, useState } from 'react'
import { ContractsList } from './ContractsList'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { IContracts } from 'pages/Clients/interfaces'

export const Contracts = memo(({ id, AddNewContract }: IContracts) => {
  const [{ contracts }, { getContractsByClientID, resetContracts }] =
    useContracts()
  const [{ admin }] = useAuth()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
    resetContracts()
    if (open) return
    getContractsByClientID(id as string)
  }

  const id_client = id as string

  return (
    <MuiDiv className={'containerCollapseMenu'}>
      <ListItemButton
        divider={open}
        className={'itemButtonCollapse1 height'}
        onClick={handleClick}>
        <ListItemText primary={'Контракты'} />
        <RotateButton open={open} handleClick={handleClick} />
      </ListItemButton>
      <Collapse
        className={'width_100_height_auto'}
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
              id_client={id_client}
              key={id}
            />
          ),
        )}
        {admin && (
          <IconPopoverButton
            popover={'Создать контракт'}
            onClick={AddNewContract}
            icon={<AddCircleOutlineIcon />}
            propsPopover={{ ml: -1 }}
            className={'addIconButton'}
          />
        )}
      </Collapse>
    </MuiDiv>
  )
})
