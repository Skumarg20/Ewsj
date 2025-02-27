'use client'
import React from 'react'
import Login from '../utils/SignIn';

type Props = {}

function LoginAndSignUp({}: Props) {
  return (
   <div className='h-screen flex items-center '>
   <Login/>
   </div>
  )
}

export default LoginAndSignUp;