import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from 'hooks/auth/useAuth'
import { Routes } from 'utils/routes'
import { isEmptyObjField } from 'utils/isEmptyObject'
import { memo } from 'react'
import { LoginPageData } from './LoginPage'
import { MainPage } from 'pages/Main'

export const LoginPage = memo(() => {
  const [{ user, isLoadingAuth }] = useAuth()

  const { state } = useLocation()
  return !isEmptyObjField(user) || (isLoadingAuth && isEmptyObjField(user)) ? (
    isLoadingAuth && isEmptyObjField(user) ? (
      <MainPage />
    ) : (
      <Navigate to={state ? state.from : Routes.Index} replace />
    )
  ) : (
    <LoginPageData />
  )
})
