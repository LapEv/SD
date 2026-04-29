import { IconButton, Menu, Tooltip } from '@mui/material'
import { useRef, useState } from 'react'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import { StatusFilter } from './StatusFilter'
import { ClientFilter } from './ClientFilter'
import { ContractFilter } from './ContractFilter'
import { ExecutorFilter } from './ExecutorFilter'
import { ResponsibleFilter } from './ResponsibleFilter'

export const QuickFilter = () => {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false)
  const quickMenuTriggerRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Tooltip
        title="Быстрые фильтры"
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton
          ref={quickMenuTriggerRef}
          aria-expanded={quickMenuTriggerRef ? 'true' : undefined}
          id="quick-menu-trigger"
          aria-controls="quick-menu"
          aria-haspopup="true"
          className={'quickIconButton'}
          onClick={() => setQuickMenuOpen(true)}>
          <BoltOutlinedIcon className={'quickIcon'} />
        </IconButton>
      </Tooltip>
      <Menu
        id="quick-menu"
        anchorEl={quickMenuTriggerRef.current}
        open={quickMenuOpen}
        onClose={() => setQuickMenuOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          list: {
            'aria-labelledby': 'qiuck-menu-trigger',
          },
        }}>
        <StatusFilter />
        <ExecutorFilter />
        <ResponsibleFilter />
        <ClientFilter />
        <ContractFilter />
      </Menu>
    </>
  )
}
