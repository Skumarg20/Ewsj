import Logout from '@mui/icons-material/Logout'
import { Account } from '@toolpad/core/Account'
import React from 'react'

type User = {
  name: string
  email: string
  avatarUrl: string
}

type Props = {
  user: User
}

function Profile({user}: Props) {
  console.log(user)
  return (
    <Account
  slotProps={{
    signInButton: {
      color: 'success',
    },
    signOutButton: {
      color: 'success',
      startIcon: <Logout />,
    },
    preview: {
      variant: 'expanded',
      slotProps: {
        avatarIconButton: {
          sx: {
            width: 'fit-content',
            margin: 'auto',
          },
        },
        avatar: {
          variant: 'rounded',
        },
      },
    },
  }}
 
/>
  )
}

export default Profile