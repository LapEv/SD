import { MuiDiv } from 'components/MUI'
import {
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Tooltip,
} from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import { useRef, useState } from 'react'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { IFilterEngineer } from '../interfaces'

export const FilterEngineer = ({
  dataGroup,
  onChooseItems,
}: IFilterEngineer) => {
  const filterEngineerMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const [filterEngineerMenuOpen, setFilterEngineerMenuOpen] = useState(false)

  const handleCloseFilterColumnsPanel = () => {
    setFilterEngineerMenuOpen(prev => !prev)
  }

  const ClickAway = (event: MouseEvent | TouchEvent) => {
    if ((event.target as HTMLInputElement).localName === 'body') {
      return
    }
    handleCloseFilterColumnsPanel()
  }

  const handleKeyDownViewColumnPanel = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseFilterColumnsPanel()
    }
  }

  return (
    <>
      <Tooltip title="Фильтр" enterDelay={300} leaveDelay={100} placement="top">
        <IconButton
          ref={filterEngineerMenuTriggerRef}
          aria-expanded={filterEngineerMenuTriggerRef ? 'true' : undefined}
          id="filterEngineer-menu-trigger"
          aria-controls="filterEngineer-menu"
          aria-haspopup="true"
          className={'filterEngineerIconButton'}
          onClick={() => setFilterEngineerMenuOpen(prev => !prev)}>
          <FilterListOutlinedIcon
            className={'filterEngineerIcon'}
            fontSize="small"
          />
        </IconButton>
      </Tooltip>
      <Popper
        open={filterEngineerMenuOpen}
        anchorEl={filterEngineerMenuTriggerRef.current}
        placement="bottom-start"
        id="filterEngineer-menu-trigger"
        onKeyDown={handleKeyDownViewColumnPanel}
        className={'poperFilterEngineerMenu'}
        sx={{ width: 200 }}>
        <ClickAwayListener onClickAway={ClickAway}>
          <Paper className={'poperFilterEngineerMenu'} elevation={8}>
            <MuiDiv className={'listfilterEngineerMobile'}>
              {dataGroup.map(({ name, id, initChecked }) => (
                <Item
                  name={name}
                  id={`${id}`}
                  props={{ ml: 2, mt: 1 }}
                  groupChecked={null}
                  onChooseItems={check =>
                    onChooseItems(check, { name, id, initChecked })
                  }
                  initChecked={initChecked}
                  key={`${id}`}
                />
              ))}
            </MuiDiv>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  )
}
