import { useAuth } from 'hooks/auth/useAuth'
import { memo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isEmptyObjField } from 'utils/isEmptyObject'
import { Routes } from 'utils/routes'

export const RequiredAuth = memo(({ children }: { children: JSX.Element }) => {
  const [{ user }] = useAuth()
  const { pathname } = useLocation()

  if (isEmptyObjField(user))
    return (
      <Navigate to={`/${Routes.Login}`} replace state={{ from: pathname }} />
    )
  return children
})
