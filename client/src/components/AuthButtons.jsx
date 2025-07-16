import React from 'react'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'

const AuthButtons = ({ isMobile = false }) => {
  const { isSignedIn, user } = useUser()

  if (isSignedIn) {
    return (
      <div className={`flex items-center gap-3 ${isMobile ? 'flex-col w-full' : ''}`}>
        <div className={`flex items-center gap-2 ${isMobile ? 'justify-center' : ''}`}>
          <span className="text-sm text-gray-600">
            Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
          </span>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }}
          />
        </div>
        {user?.publicMetadata?.role === 'admin' && (
          <span className={`px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium ${isMobile ? 'mt-2' : ''}`}>
            Admin
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex gap-3 ${isMobile ? 'flex-col w-full' : ''}`}>
      <SignInButton mode="modal">
        <button className={`px-4 py-2 text-[rgba(0,85,149,1)] border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium ${isMobile ? 'w-full' : ''}`}>
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className={`px-4 py-2 bg-[rgba(0,85,149,1)] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium ${isMobile ? 'w-full' : ''}`}>
          Sign Up
        </button>
      </SignUpButton>
    </div>
  )
}

export default AuthButtons