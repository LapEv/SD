import {
  Box,
  Collapse,
  ListItemButton,
  ListItemText,
  Modal,
} from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { memo, useState } from 'react'
import { listItemButton } from 'static/styles/listItemButton'
import { SwitchMUI } from 'components/Switch'
import { useAuth } from 'hooks/auth/useAuth'
import { ThemeMode } from 'storeAuth/interfaces'
import { Button } from 'components/Buttons'
import { ProfileChangeTheme } from './ProfileChangeTheme'

export const ProfileAppOptions = memo(() => {
  const [modal, setModal] = useState<boolean>(false)
  const [
    { user /*colorTheme*/ },
    { changeUserAppOptions /*changeColorTheme*/ },
  ] = useAuth()
  const [open, setOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState<boolean>(
    user.appOptions?.theme === 'light' ? false : true,
  )
  const [font, setFont] = useState<boolean>(
    user.appOptions?.font === 'large' ? false : true,
  )

  // const [colorLight, setColorLight] = useState<string>(ThemeColor.light)
  // const [colorDark, setColorDark] = useState<string>(ThemeColor.dark)

  const handleClick = () => {
    setOpen(!open)
  }

  const handleChangeTheme = () => {
    setTheme(!theme)
    const appOptions = {
      ...user.appOptions,
      theme: (theme ? 'light' : 'dark') as ThemeMode,
    }
    changeUserAppOptions({ id: user.id as string, appOptions })
  }

  const handleChangeFont = () => {
    setFont(!font)
    const appOptions = { ...user.appOptions, font: font ? 'large' : 'small' }
    changeUserAppOptions({ id: user.id as string, appOptions })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        mt: 2,
      }}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <>
          <ProfileChangeTheme handleModal={setModal} />
        </>
      </Modal>
      <ListItemButton divider={open} sx={listItemButton} onClick={handleClick}>
        <>
          <ListItemText
            primary={'Настройки приложения'}
            primaryTypographyProps={{ fontSize: '1rem!important' }}
          />
          <RotateButton open={open} handleClick={handleClick} size={'1.5rem'} />
        </>
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', mt: 2 }}
        in={open}
        timeout="auto"
        unmountOnExit>
        <SwitchMUI
          label={`Тема ${theme ? 'тёмная' : 'светлая'}`}
          onChange={handleChangeTheme}
          checked={theme}
          value={theme}
        />
        <SwitchMUI
          label={`Значки ${font ? 'маленькие' : 'большие'}`}
          onChange={handleChangeFont}
          checked={font}
          value={font}
        />
        <Button
          onClick={() => setModal(prev => !prev)}
          sx={{ width: '30%', mt: 2 }}>
          Сменить цвет темы
        </Button>
      </Collapse>
    </Box>
  )
})
