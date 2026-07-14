import { useState, MouseEvent, memo } from 'react'
import MuiFab from '@mui/material/Fab'
import { Popover } from '@mui/material'
import { FabProps } from './interfaces'
import { PopoverTypography } from 'components/Popover/PopoverTypography'

export const Fab = memo(({ title, ...props }: FabProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <MuiFab
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        size="small"
        className="fullscreen"
        {...props}
      />
      <Popover
        sx={{
          pointerEvents: 'none',
          background: 'none',
          mt: 1,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        container={anchorEl}>
        <PopoverTypography text={title} />
      </Popover>
    </>
  )
})
