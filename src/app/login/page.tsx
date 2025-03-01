'use client'
import React from 'react'
import Login from '../utils/SignIn';

type Props = {}

function LoginAndSignUp({}: Props) {
  return (
   <div className='max-h-full bg-white flex items-center '>
   <Login/>
   </div>
  )
}

export default LoginAndSignUp;