import { useState, MouseEvent, memo } from 'react'
import MuiFab from '@mui/material/Fab'
import Popover from '@mui/material/Popover'
import { FabProps } from './interfaces'
import { PopoverTypography } from 'components/Popover/PopoverTypography'
import { useTheme } from '@mui/styles'
import { ITheme } from 'themes/themeConfig'

export const Fab = memo(({ order = 0, title, active, ...props }: FabProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const theme = useTheme() as ITheme

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
        color={active ? 'secondary' : 'primary'}
        size="small"
        sx={{
          position: 'fixed',
          bottom: 8 + order * 49,
          left: theme.fontSize === 'small' ? 6 : 16,
          borderRadius: '20%',
          zIndex: 1300,
          width: theme.fontSize === 'small' ? 30 : 40,
          height: theme.fontSize === 'small' ? 30 : 40,
          minHeight: theme.fontSize === 'small' ? 30 : 40,
          color: '#000000',
        }}
        {...props}
      />
      <Popover
        sx={{
          pointerEvents: 'none',
          background: 'none',
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
