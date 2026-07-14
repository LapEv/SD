import FormControlLabel from '@mui/material/FormControlLabel'
import { ISwitchMUI } from './interfaces'
import { Switch, styled } from '@mui/material'
import { memo } from 'react'
import { ITheme, ThemeMode } from 'themes/themeConfig'

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '.MuiSwitch-thumb': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.darkPrimary
        : (theme as ITheme).colorTheme.dark.lightPrimary,
  },
  '.MuiSwitch-track': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? `${(theme as ITheme).colorTheme.light.switch_Off}!important`
        : `${(theme as ITheme).colorTheme.dark.switch_Off}!important`,
  },
  '.Mui-checked+.MuiSwitch-track': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? `${(theme as ITheme).colorTheme.light.switch_On}!important`
        : `${(theme as ITheme).colorTheme.dark.switch_On}!important`,
  },
  '&.MuiTableCell-head, .MuiTableCell-paddingNone': {
    padding: '5px!important',
  },
}))

const CustomFormControl = styled(FormControlLabel)(({ theme }) => ({
  '&.MuiFormControlLabel-root': {
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.dark.lightPrimary
        : (theme as ITheme).colorTheme.light.darkPrimary,
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export const SwitchMUI = memo(({ label, checked, onChange }: ISwitchMUI) => {
  return (
    <CustomFormControl
      control={
        <CustomSwitch
          checked={checked}
          onChange={({ target }) => onChange(target.checked)}
        />
      }
      label={label}
      labelPlacement="start"
    />
  )
})
