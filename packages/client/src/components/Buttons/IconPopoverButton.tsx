import { useState, MouseEvent, memo } from 'react'
import { Popover, IconButton } from '@mui/material'
import { IconButtonProps } from './interfaces'
import { PopoverTypography } from 'components/Popover/PopoverTypography'

export const IconPopoverButton = memo(
  ({
    popover,
    onClick,
    icon,
    vertical,
    horizontal,
    vertical2,
    horizontal2,
    size,
    sx,
    propsPopover,
    className,
  }: IconButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const open = Boolean(anchorEl)
    return (
      <>
        <IconButton
          onMouseEnter={(event: MouseEvent<HTMLElement>) =>
            setAnchorEl(event.currentTarget)
          }
          onMouseLeave={() => setAnchorEl(null)}
          onClick={onClick}
          size={size ?? 'small'}
          sx={sx}
          className={className}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          {icon ?? ''}
        </IconButton>
        {popover.length > 0 && (
          <Popover
            sx={{
              ...propsPopover,
              pointerEvents: 'none',
              background: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: vertical ?? 'center',
              horizontal: horizontal ?? 'left',
            }}
            transformOrigin={{
              vertical: vertical2 ?? 'center',
              horizontal: horizontal2 ?? 'left',
            }}
            onClose={(event: MouseEvent<HTMLElement>) =>
              setAnchorEl(event.currentTarget)
            }
            disableRestoreFocus
            container={anchorEl}>
            <PopoverTypography text={popover} />
          </Popover>
        )}
      </>
    )
  },
)
