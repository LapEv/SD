import { FC, memo } from 'react'
import { styled } from '@mui/material/styles'
import { IconButton, Link } from '@mui/material'
import { LeftArrow, RightArrow } from 'components/SVGIcons'
import { DrawerHeaderProps } from './interfaces'
import { MuiDiv } from 'components/MUI'
import { Link as RouterLink } from 'react-router-dom'

export const DrawerHeader: FC<DrawerHeaderProps> = memo(
  ({ open, toggleDrawer, fontSize }) => {
    const DrawerHeader = styled('div')(({ theme }) => ({
      minWidth: '100%',
      marginTop: 0,
      minHeight: '40px!important',
      height: 40,
      zIndex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 2,
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    }))
    return (
      <DrawerHeader
        sx={{
          pl: open ? 3 : 0,
          minHeight: `${fontSize === 'small' ? '40px!important' : '55px!important'}`,
        }}>
        <MuiDiv className="logo_arrow">
          {open && (
            <Link
              variant="h6"
              sx={{ color: 'black' }}
              component={RouterLink}
              to={`/`}>
              SBI
            </Link>
          )}
        </MuiDiv>

        <IconButton onClick={() => toggleDrawer(!open)}>
          {open ? <LeftArrow /> : <RightArrow />}
        </IconButton>
      </DrawerHeader>
    )
  },
)
