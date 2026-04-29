import { ViewColumn } from '@mui/icons-material'
import {
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Tooltip,
} from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { ClearSearchModalSection } from 'components/Buttons'
import { Item } from 'components/CheckBoxGroup'
import { TextFieldIncidents } from 'components/TextFields'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useFilteredData } from 'hooks/useFilteredData'
import { ChangeEvent, useRef, useState } from 'react'
import { IColumnOptions } from 'store/slices/tableINC/interfaces'

export const ViewColumns = () => {
  const [{ columnOptions }, { setColumnOptions }] = useTableINC()
  const [viewColumnsMenuOpen, setViewColumnsMenuOpen] = useState(false)
  const viewColumnsMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const [filterText, setFilterText] = useState<string>('')
  const filteredColumnsOptions = useFilteredData<IColumnOptions>(
    columnOptions,
    filterText,
    ['label'],
  )

  const handleCloseViewColumnsPanel = () => {
    setViewColumnsMenuOpen(prev => !prev)
  }

  const ClickAway = (event: MouseEvent | TouchEvent) => {
    if ((event.target as HTMLInputElement).localName === 'body') {
      return
    }
    handleCloseViewColumnsPanel()
  }

  const onChooseItems = (check: boolean, item: IColumnOptions) => {
    const newColumns = columnOptions.map(value =>
      value.id === item.id
        ? {
            ...value,
            disableColumn: !check,
          }
        : value,
    )
    setColumnOptions(newColumns)
  }

  const handleKeyDownViewColumnPanel = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseViewColumnsPanel()
    }
  }

  return (
    <>
      <Tooltip
        title="Столбцы"
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton
          ref={viewColumnsMenuTriggerRef}
          aria-expanded={viewColumnsMenuTriggerRef ? 'true' : undefined}
          id="viewColumns-menu-trigger"
          aria-controls="viewColumns-menu"
          aria-haspopup="true"
          className={'viewColumnsIconButton'}
          onClick={() => setViewColumnsMenuOpen(true)}>
          <ViewColumn className={'viewColumnsIcon'} />
        </IconButton>
      </Tooltip>
      <Popper
        open={viewColumnsMenuOpen}
        anchorEl={viewColumnsMenuTriggerRef.current}
        placement="bottom-end"
        id="viewColumns-menu-trigger"
        onKeyDown={handleKeyDownViewColumnPanel}
        className={'poperViewColumnsMenu'}>
        <ClickAwayListener onClickAway={ClickAway}>
          <Paper className={'paperViewColumnsMenu'} elevation={8}>
            <MuiDiv className={'boxViewColumn'}>
              <TextFieldIncidents
                variant="outlined"
                className={'textCellsNewINC'}
                label="Введите фильтр"
                margin="normal"
                value={filterText || ''}
                sx={{ width: '100%', paddingRight: 0 }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFilterText(e.target.value ?? '')
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <ClearSearchModalSection
                        length={filterText.length}
                        handleClick={() => setFilterText('')}
                        className="colorForIconDark"
                      />
                    ),
                  },
                }}
              />
            </MuiDiv>
            <MuiDiv className={'listViewColumn'}>
              {filteredColumnsOptions.map((item, index) => (
                <Item
                  name={item.label}
                  id={`${item}_viewColumns${index}`}
                  props={{ ml: 2 }}
                  groupChecked={null}
                  onChooseItems={check => onChooseItems(check, item)}
                  initChecked={!item.disableColumn || false}
                  key={`${item}_viewColumns${index}`}
                />
              ))}
            </MuiDiv>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  )
}
