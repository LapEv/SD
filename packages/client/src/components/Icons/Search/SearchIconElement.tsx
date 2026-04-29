import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import { ISearchIconElement } from 'components/Buttons/interfaces'
import { memo } from 'react'

export const SearchIconElement = memo(({ className }: ISearchIconElement) => {
  return (
    <IconButton className={`searchIconButton `}>
      <SearchIcon className={`colorForIconDark ${className}`} />
    </IconButton>
  )
})
