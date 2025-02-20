import { useAuth } from 'hooks/auth/useAuth'
import { Box, Typography } from '@mui/material'
import { LinkButton } from 'components/LinkButton'
import { Routes } from 'utils/routes'
import { memo } from 'react'

export const LoginButtons = memo(() => {
  const [{ user }, { signout }] = useAuth()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        marginLeft: '30',
        width: '290px',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      {user && (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 20,
          }}>
          {user.firstName}
        </Typography>
      )}
      <LinkButton
        onClick={() => user && signout()}
        sx={{ width: 'fit-content' }}
        to={`/${Routes.Login}`}>
        {user ? 'Выйти' : 'Войти'}
      </LinkButton>

      {!user && (
        <LinkButton sx={{ width: 'fit-content' }} to={`/${Routes.SignUp}`}>
          Регистрация
        </LinkButton>
      )}
    </Box>
  )
})
