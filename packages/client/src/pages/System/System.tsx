import { Container, List, Typography } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { memo, useEffect } from 'react'
import { sections } from './data'
import { Sections } from './Sections'
import { useSystem } from 'hooks/system/useSystem'

export const SystemPage = memo(() => {
  const [{ system }, { getSystem }] = useSystem()

  useEffect(() => {
    getSystem()
  }, [])

  console.log('system = ', system)

  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
      <MuiDiv className={'headerForPages'}>
        <Typography variant="h6">Настройки системы</Typography>
      </MuiDiv>
      <List className={'pageListContainer'}>
        {sections.map(({ label, id }) => (
          <Sections label={label} id={id} key={`${id}_${label}`} />
        ))}
      </List>
    </Container>
  )
})
