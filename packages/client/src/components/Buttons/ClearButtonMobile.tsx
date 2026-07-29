import { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import ClearRounded from '@mui/icons-material/ClearRounded'
import { IClearButton } from './interfaces'

export const ClearButtonMobile = memo(
  ({ handleClick, className, classNameBox, length }: IClearButton) => {
    return (
      <>
        {(length as number) > 0 && (
          <IconButton
            onClick={handleClick}
            className={`clearFilterMobileIconButton ${classNameBox}`}>
            <ClearRounded className={`clearFilterMobileIcon ${className}`} />
          </IconButton>
        )}
      </>
    )
  },
)
