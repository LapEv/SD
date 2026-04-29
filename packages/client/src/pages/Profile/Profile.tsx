import { Container, Modal, Typography } from '@mui/material'
import { memo, useState } from 'react'
import { ProfileMain } from './ProfileMain'
import { useAuth } from 'hooks/auth/useAuth'
import { ProfileChangePassword } from './ProfileChangePassword'
import { UserProfile } from 'storeAuth/interfaces'
import { MuiDiv } from 'components/MUI'

export const ProfilePage = memo(() => {
  const [{ user }] = useAuth()
  const [modal, setModal] = useState<boolean>(false)

  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <>
          <ProfileChangePassword
            handleModal={setModal}
            userId={user.id as string}
          />
        </>
      </Modal>
      <MuiDiv className={'headerForPages'}>
        <Typography variant="h6">Профиль</Typography>
      </MuiDiv>
      <ProfileMain
        setModal={() => setModal(prev => !prev)}
        dataUser={user as UserProfile}
      />
    </Container>
  )
})
