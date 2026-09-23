import { useAuth } from 'hooks/auth/useAuth'
import { JSX, memo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isEmptyObjField } from 'utils/isEmptyObject'
import { Routes } from 'utils/routes'

export const RequiredAuth = memo(({ children }: { children: JSX.Element }) => {
  const [{ user }] = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isEmptyObjField(user)) {
      navigate(`/${Routes.Login}`, { replace: true, state: { from: pathname } })
    }
  }, [])

  if (isEmptyObjField(user)) return <></>
  return children
})
