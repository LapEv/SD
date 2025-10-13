import { memo } from 'react'
import { ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material'
import { NanListItemProps } from 'layouts/Main/interfaces'
import { ITheme } from 'themes/themeConfig'
import { useIncidents } from 'hooks/incidents/useINC'

export const ControlRoomCustomFilterList = memo(
  ({ text, isExpanded, id }: NanListItemProps) => {
    const theme = useTheme()
    const [, { setStateOutputFilter }] = useIncidents()

    const handleClick = () => {
      const filter = {
        isOutputFilter: true,
        filterID: id as string,
        filterText: text,
      }
      setStateOutputFilter(filter)
    }

    return (
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          ml: (theme as ITheme).fontSize === 'small' ? 8 : 5,
          height: (theme as ITheme).fontSize === 'small' ? 25 : 30,
        }}>
        <ListItemButton
          sx={{
            minHeight: 20,
            justifyContent: isExpanded ? 'initial' : 'center',
            p: 0,
          }}
          onClick={handleClick}>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontSize: (theme as ITheme).fontSize === 'small' ? 10 : 12,
            }}
            sx={{ display: isExpanded ? 'block' : 'none' }}
          />
        </ListItemButton>
      </ListItem>
    )
  },
)
