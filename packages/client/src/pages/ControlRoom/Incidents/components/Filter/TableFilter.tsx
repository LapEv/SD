import { IconButton, Popper, Tooltip } from '@mui/material'
import { useRef, useState } from 'react'
import { FilterPaper } from './FilterPaper'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { useApp } from 'hooks/app/useApp'

export const TableFilter = () => {
  const [{ device }] = useApp()
  const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(false)
  const filterPanelTriggerRef = useRef<HTMLButtonElement>(null)

  const handleCloseFilterPanel = () => {
    setFilterPanelOpen(prev => !prev)
  }

  const handleKeyDownFilterPanel = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseFilterPanel()
    }
  }

  return (
    <>
      <Tooltip title="Фильтр" enterDelay={300} leaveDelay={100} placement="top">
        <IconButton
          ref={filterPanelTriggerRef}
          aria-expanded={filterPanelTriggerRef ? 'true' : undefined}
          id="filter-menu-trigger"
          aria-controls="filter-menu"
          aria-haspopup="true"
          className={'filterIconButton'}
          onClick={() => setFilterPanelOpen(prev => !prev)}>
          <FilterListOutlinedIcon className={'filterIcon'} fontSize="small" />
        </IconButton>
      </Tooltip>

      <Popper
        open={filterPanelOpen}
        anchorEl={filterPanelTriggerRef.current}
        placement="bottom-start"
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [220, 4],
            },
          },
        ]}
        id="filter-menu-trigger"
        onKeyDown={handleKeyDownFilterPanel}
        className={`${device === 'mobile' ? 'poperFilterMenuMobile' : 'poperFilterMenu'}`}>
        <FilterPaper handleCloseFilterPanel={handleCloseFilterPanel} />
      </Popper>
    </>
  )
}
