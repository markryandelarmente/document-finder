"use client"

import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'

const Logout = () => {
  return (
    <Button onClick={() => signOut({callbackUrl: "/"})}>Logout</Button>
  )
}

export default Logout
