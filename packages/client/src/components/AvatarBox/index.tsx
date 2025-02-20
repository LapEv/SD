import Avatar, { AvatarProps } from '@mui/material/Avatar'
import { AddUserIcon } from './AddUserIcon'
import { ITheme, ThemeMode } from 'themes/themeConfig'
import { useTheme } from '@mui/styles'

export function AvatarBox(props: AvatarProps) {
  const theme = useTheme() as ITheme

  return (
    <Avatar
      variant="rounded"
      sx={{
        p: '50px',
        bgcolor:
          theme.palette.mode === ThemeMode.light
            ? (theme as ITheme).colorTheme.colorDark
            : (theme as ITheme).colorTheme.colorLight,
      }}
      {...props}>
      {!props.src && <AddUserIcon />}
    </Avatar>
  )
}
