import { useState, useEffect, memo } from 'react'
import {
  Snackbar,
  Alert,
  AlertTitle,
  AlertColor,
  useTheme,
} from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'
import { useMessage } from 'hooks/message/useMessage'
import { ITheme, ThemeMode } from 'themes/themeConfig'

const TransitionLeft = memo((props: SlideProps) => {
  return <Slide {...props} direction="up" />
})

export const Message = memo(() => {
  const [show, setShow] = useState(false)
  const theme = useTheme()

  const [{ text, type }, { resetMessage }] = useMessage()

  useEffect(() => {
    if (type) {
      setShow(true)
    }
  }, [text])

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      message={text}
      TransitionComponent={TransitionLeft}
      onClose={() => (
        setShow(false),
        setTimeout(() => {
          resetMessage()
        }, 100)
      )}>
      <Alert
        severity={(type as AlertColor) ?? 'success'}
        sx={{
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor:
            theme.palette.mode === ThemeMode.light
              ? (theme as ITheme).colorTheme.colorDark
              : (theme as ITheme).colorTheme.colorLight,
          borderRadius: 2,
          boxShadow: 20,
        }}>
        <AlertTitle>
          {type === 'error'
            ? 'Ошибка'
            : type === 'warning'
              ? 'Предупреждение'
              : type === 'info'
                ? 'Информация'
                : type === 'success'
                  ? 'Успешно'
                  : ''}
        </AlertTitle>
        {text}
      </Alert>
    </Snackbar>
  )
})
