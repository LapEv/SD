import {
  ClickAwayListener,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import { MuiDiv } from 'components/MUI'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useRef, useState } from 'react'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { ClearButton } from 'components/Buttons'

export const QuickSearch = () => {
  const [{ searchValue }, { setSearchValue }] = useTableINC()
  const [openSearch, setOpenSearch] = useState(false)
  const textFiledRef = useRef<HTMLInputElement>(null)

  const ClickAway = () => {
    if (searchValue) return
    setOpenSearch(false)
  }

  const clearText = () => {
    setSearchValue('')
    setOpenSearch(false)
  }

  return (
    <ClickAwayListener onClickAway={ClickAway}>
      <MuiDiv className={'searchFilterBox'}>
        <TextField
          ref={textFiledRef}
          variant="standard"
          className={'searchFilter'}
          sx={{
            width: openSearch ? 180 : 0,
            marginLeft: openSearch ? '5px' : 0,
          }}
          value={searchValue ?? ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value)
          }}
          slotProps={{
            input: {
              endAdornment: (
                <ClearButton
                  length={searchValue.length}
                  className={'quickIcon colorForIcon'}
                  handleClick={clearText}
                />
              ),
            },
          }}
        />
        <Tooltip
          title="Поиск"
          enterDelay={300}
          leaveDelay={100}
          placement="top">
          <IconButton
            id="search-menu-trigger"
            aria-haspopup="true"
            className={'searchIconButton'}
            onClick={() =>
              !searchValue ? setOpenSearch(prev => !prev) : null
            }>
            <SearchOutlinedIcon className={'searchIcon'} />
          </IconButton>
        </Tooltip>
      </MuiDiv>
    </ClickAwayListener>
  )
}
