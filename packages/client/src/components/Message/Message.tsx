import { useState, useEffect, memo } from 'react'
import { Snackbar, Alert, AlertTitle, AlertColor } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'
import { useMessage } from 'hooks/message/useMessage'

const TransitionLeft = memo((props: SlideProps) => {
  return <Slide {...props} direction="up" />
})

export const Message = memo(() => {
  const [show, setShow] = useState(false)

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
        className="paperMessageAlert">
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
