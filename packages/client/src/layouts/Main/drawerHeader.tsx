import { FC, memo } from 'react'
import { styled } from '@mui/material/styles'
import { IconButton, Typography, Box, useTheme } from '@mui/material'
import { LeftArrow, RightArrow } from 'layouts/Main/icons'
import { DrawerHeaderProps } from './interfaces'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const DrawerHeader: FC<DrawerHeaderProps> = memo(
  ({ open, toggleDrawer }) => {
    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    }))
    const theme = useTheme()

    return (
      <DrawerHeader
        sx={{
          minWidth: '100%',
          mt: 0,
          minHeight: '0px!important',
          zIndex: 1,
          boxShadow: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pl: open ? 3 : 0,
          pr: 2,
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {open ? (
            <Typography variant="h6">SD</Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{
                zIndex: -1,
                color:
                  theme.palette.mode === ThemeMode.dark
                    ? (theme as ITheme).colorTheme.colorLight
                    : (theme as ITheme).colorTheme.colorDark,
              }}>
              .
            </Typography>
          )}
        </Box>

        <IconButton onClick={() => toggleDrawer(!open)}>
          {open ? <LeftArrow /> : <RightArrow />}
        </IconButton>
      </DrawerHeader>
    )
  },
)
