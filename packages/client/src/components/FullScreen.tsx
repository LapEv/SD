import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useFullScreen } from 'hooks/useFullScreen'
import { Fab } from './Buttons/FloatingActionButton'
import ZoomInMap from '@mui/icons-material/ZoomInMap'
import ZoomOutMap from '@mui/icons-material/ZoomInMap'
import { memo, type PropsWithChildren } from 'react'
import { useApp } from 'hooks/app/useApp'

const Screen = styled(Box)(() => ({
  '&::backdrop': {
    display: 'none',
  },
}))

export const FullScreen = memo(({ children }: PropsWithChildren) => {
  const [screenRef, fullScreen, toggleFullScreen] = useFullScreen()
  const [{ device }] = useApp()

  return (
    <Screen ref={screenRef}>
      {children}
      {device === 'desktop' && (
        <Fab
          title={fullScreen ? 'Обычный режим' : 'Полноэкранный режим'}
          onClick={toggleFullScreen}>
          {fullScreen ? <ZoomInMap /> : <ZoomOutMap />}
        </Fab>
      )}
    </Screen>
  )
})
