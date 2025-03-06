'use client'
import React from 'react'
import Login from '../utils/SignIn';

// Use 'object' instead of '{}'
// type Props = object;

function LoginAndSignUp() {
  return (
    <div className='max-h-full bg-white flex items-center'>
      <Login/>
    </div>
  )
}

export default LoginAndSignUp;