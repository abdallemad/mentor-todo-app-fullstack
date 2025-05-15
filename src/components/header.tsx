import React from 'react'
import { ModeToggle } from './theme/mode-toggle'
import { SignOutButton } from '@clerk/nextjs'
function Header() {
  return (
    <header className='flex items-center justify-between mb-12'>
        <h1 className="h1">TODO</h1>
        <ModeToggle />
    </header>
  )
}

export default Header