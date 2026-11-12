import { useAuth } from 'hooks/auth/useAuth'
import {
  clientData,
  DispatcherData,
  FieldEngineersData,
  menuData,
  OtherData,
} from 'layouts/Main/drawerBarData'
import { JSX, memo, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
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

  const checkRoute = () => {
    if (pathname === '/') return true
    if (
      user &&
      user.status === 'employee' &&
      user.RolesGroup?.group === 'Dispatcher'
    ) {
      const check = DispatcherData.find(
        ({ to }) => pathname.includes(to) && to !== '/',
      )
      return check ? true : false
    }

    if (
      user &&
      user.status === 'employee' &&
      user.RolesGroup?.group === 'FieldEngineers'
    ) {
      const check = FieldEngineersData.find(
        ({ to }) => pathname.includes(to) && to !== '/',
      )
      return check ? true : false
    }

    if (
      user &&
      user.status === 'employee' &&
      (user.RolesGroup?.group === 'ADMIN' ||
        user.RolesGroup?.group === 'SUPERADMIN')
    ) {
      const check = menuData.find(
        ({ to }) => pathname.includes(to) && to !== '/',
      )
      return check ? true : false
    }

    if (user && user.status === 'client') {
      const check = clientData.find(
        ({ to }) => pathname.includes(to) && to !== '/',
      )
      return check ? true : false
    }
    const check = OtherData.find(
      ({ to }) => pathname.includes(to) && to !== '/',
    )
    return check ? true : false
  }

  const _checkRoute = checkRoute()
  if (!isEmptyObjField(user) && !_checkRoute) {
    return <Navigate to={Routes.Index} replace />
  }
  if (isEmptyObjField(user)) return <></>
  return children
})
