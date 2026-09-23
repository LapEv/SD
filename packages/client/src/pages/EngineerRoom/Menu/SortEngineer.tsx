import { MuiDiv } from 'components/MUI'
import {
  ClickAwayListener,
  IconButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
} from '@mui/material'
import { useRef, useState } from 'react'
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined'
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined'
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined'
import { sortEngineerData } from '../data'
import { useEngineer } from 'hooks/engineer/useEngineer'
import { Order } from 'utils/getComparator'

export const SortEngineer = () => {
  const sortEngineerMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const [sortEngineerMenuOpen, setSortEngineerMenuOpen] = useState(false)
  const [{ sortEngineerStatus }, { changeSortStatus }] = useEngineer()

  const handleCloseSortColumnsPanel = () => {
    setSortEngineerMenuOpen(prev => !prev)
  }

  const ClickAway = (event: MouseEvent | TouchEvent) => {
    if ((event.target as HTMLInputElement).localName === 'body') {
      return
    }
    handleCloseSortColumnsPanel()
  }

  const handleKeyDownViewColumnPanel = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseSortColumnsPanel()
    }
  }

  const changeSort = (orderBy: string) => {
    const newSort =
      sortEngineerStatus.orderBy === orderBy
        ? {
            orderBy,
            order:
              sortEngineerStatus.order === ('desc' as Order)
                ? ('ask' as Order)
                : ('desc' as Order),
          }
        : { orderBy, order: 'desc' as Order }
    changeSortStatus(newSort)
    handleCloseSortColumnsPanel()
  }

  return (
    <>
      <Tooltip
        title="Сортировка"
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton
          ref={sortEngineerMenuTriggerRef}
          aria-expanded={sortEngineerMenuTriggerRef ? 'true' : undefined}
          id="sortEngineer-menu-trigger"
          aria-controls="filterEngineer-menu"
          aria-haspopup="true"
          className={'filterEngineerIconButton'}
          onClick={() => setSortEngineerMenuOpen(prev => !prev)}>
          <SwapVertOutlinedIcon
            className={'sortEngineerIcon'}
            fontSize="small"
          />
        </IconButton>
      </Tooltip>
      <Popper
        open={sortEngineerMenuOpen}
        anchorEl={sortEngineerMenuTriggerRef.current}
        placement="bottom-start"
        id="sortEngineer-menu-trigger"
        onKeyDown={handleKeyDownViewColumnPanel}
        className={'poperSortEngineerMenu'}
        sx={{ width: 200 }}>
        <ClickAwayListener onClickAway={ClickAway}>
          <Paper className={'poperSortEngineerMenu'} elevation={8}>
            <MuiDiv className={'listSortEngineerMobile'}>
              {sortEngineerData.map(({ label, orderBy }) => (
                <MuiDiv
                  key={`${label}_${orderBy}`}
                  className="sortEngineerElementBox"
                  onClick={() => changeSort(orderBy)}>
                  <ListItemIcon>
                    {sortEngineerStatus.orderBy === orderBy ? (
                      sortEngineerStatus.order === ('desc' as Order) ? (
                        <SouthOutlinedIcon className="sortEngineerArrowIcon" />
                      ) : (
                        <NorthOutlinedIcon className="sortEngineerArrowIcon" />
                      )
                    ) : (
                      <MuiDiv className="sortEngineerArrowIcon"></MuiDiv>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </MuiDiv>
              ))}
            </MuiDiv>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  )
}
