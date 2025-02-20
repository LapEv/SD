import { Box, Typography } from '@mui/material'
import { ButtonsSectionNoSubmit } from 'components/Buttons'
import { IProfileChangeTheme } from './interfaces'
import { useAuth } from 'hooks/auth/useAuth'
import { modalStyle } from 'static/styles'
import { memo } from 'react'
import ColorPicker from 'mui-color-picker'

export const ProfileChangeTheme = memo(
  ({ handleModal }: IProfileChangeTheme) => {
    // const [, { changePassword }] = useAuth()
    const [{ colorTheme }, { /*changeUserAppOptions,*/ changeColorTheme }] =
      useAuth()

    function changeTheme() {
      // changePassword({
      //   oldPassword: data.list[0].value,
      //   newPassword: data.list[1].value,
      //   id: userId,
      // })
      handleModal(false)
    }

    const handleChangeColorLight = (colorLight: string) => {
      if (!colorLight) return
      changeColorTheme({ ...colorTheme, colorLight })
      // const appOptions = { ...user.appOptions, color_Light }
      // changeUserAppOptions({ id: user.id as string, appOptions })
    }

    const handleChangeColorDark = (colorDark: string) => {
      if (!colorDark) return
      changeColorTheme({ ...colorTheme, colorDark })
      // const appOptions = { ...user.appOptions, color_Dark }
      // changeUserAppOptions({ id: user.id as string, appOptions })
    }

    const undoChanges = () => {}

    return (
      <Box sx={{ ...modalStyle, height: 400 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Box
            sx={{
              ml: 4,
              mt: 2,
              justifyContent: 'flex-start',
              width: '85%',
            }}>
            <Typography variant="body1">Цвет светлой темы</Typography>
            <ColorPicker
              sx={{
                mt: 1,
                backgroundColor: colorTheme.colorLight,
                borderRadius: 1,
              }}
              name="color"
              defaultValue={colorTheme.colorLight}
              onChange={handleChangeColorLight}
            />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              {colorTheme.colorLight}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: 4,
              mt: 2,
              justifyContent: 'space-between',
              width: '85%',
            }}>
            <Typography variant="body1">Цвет темной темы</Typography>
            <ColorPicker
              sx={{
                mt: 1,
                backgroundColor: colorTheme.colorDark,
                borderRadius: 1,
              }}
              name="color"
              defaultValue={colorTheme.colorDark}
              onChange={handleChangeColorDark}
            />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              {colorTheme.colorDark}
            </Typography>
          </Box>
        </Box>
        <ButtonsSectionNoSubmit
          btnHandle={changeTheme}
          btnSecondHandle={undoChanges}
          btnName="Сохранить"
          btnDisabled={false}
          btnSecondName="Отменить"
          btnSecondDisabled={false}
        />
      </Box>
    )
  },
)
