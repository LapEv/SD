import { Collapse, ListItemButton, ListItemText, Modal } from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { memo, useState } from 'react'
import { SwitchMUI } from 'components/Switch'
import { useAuth } from 'hooks/auth/useAuth'
import { ThemeMode } from 'storeAuth/interfaces'
import { Button } from 'components/Buttons'
import { MuiDiv } from 'components/MUI'
// import { ProfileChangeTheme } from './ProfileChangeTheme'

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
    <MuiDiv className={'profileAppOptionsContainer'}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <>{/* <ProfileChangeTheme handleModal={setModal} /> */}</>
      </Modal>
      <ListItemButton
        divider={open}
        className={'itemButtonCollapse'}
        onClick={handleClick}>
        <>
          <ListItemText primary={'Настройки приложения'} />
          <RotateButton open={open} handleClick={handleClick} size={'1.5rem'} />
        </>
      </ListItemButton>
      <Collapse
        className={'profileAppOptionsContainer'}
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
        <Button onClick={() => setModal(prev => !prev)}>
          Сменить цвет темы
        </Button>
        ColorPicker here
      </Collapse>
    </MuiDiv>
  )
})
