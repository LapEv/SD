import { memo, useRef } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { MuiDiv } from 'components/MUI'
import { MainContainer } from './Components/MainContainer/MainContainer'
import { Outlet } from 'react-router-dom'

export const MainLayout = memo(() => {
  const [{ user }] = useAuth()
  const boxRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {user && user.status ? (
        <MainContainer boxRef={boxRef} />
      ) : (
        <MuiDiv ref={boxRef} className="mainContainerClose">
          <Outlet />
        </MuiDiv>
      )}
    </>
  )
})
