'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  const handleSignOut = () => {
    // Use NextAuth's signOut with redirect
    // This will properly clear the session and redirect
    signOut({ 
      callbackUrl: '/',
      redirect: true 
    })
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-primary-darkest dark:text-primary-lightest hover:text-primary-medium dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      Sign Out
    </button>
  )
}



