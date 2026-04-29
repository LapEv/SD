import { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import ClearRounded from '@mui/icons-material/ClearRounded'
import { IClearButton } from './interfaces'

export const ClearButton = memo(
  ({ handleClick, className, classNameBox, length }: IClearButton) => {
    return (
      <>
        {(length as number) > 0 && (
          <IconButton
            onClick={handleClick}
            className={`clearFilterIconButton ${classNameBox}`}>
            <ClearRounded className={`clearFilterIcon ${className}`} />
          </IconButton>
        )}
      </>
    )
  },
)
