import React, { useEffect } from 'react'
import { SignInButton, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const { user, isSignedIn } = useUser()
  const navigate = useNavigate()
  
useEffect(() => {
  if (isSignedIn && user?.publicMetadata?.role === 'admin') {
    navigate('/admin');
  }
}, [isSignedIn, user?.publicMetadata?.role, navigate]);

if (isSignedIn && !user?.publicMetadata?.role) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-gray-600 text-lg font-medium">Loading admin status...</div>
    </div>
  );
}
  
  // Check if user is already an admin
  if (user?.publicMetadata?.role === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Granted</h2>
              <p className="text-gray-600 mb-6">You have administrative privileges.</p>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Go to Admin Dashboard
                </button>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Admin Features:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Manage content and resources</li>
                    <li>• View user analytics</li>
                    <li>• Access admin dashboard</li>
                    <li>• Moderate gallery and posts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show message if user is signed in but not admin
  if (isSignedIn && user?.publicMetadata?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-6">You are signed in but don't have admin privileges.</p>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Go to Home
                </button>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Contact the system administrator to request admin privileges for your account: <strong>{user?.emailAddresses[0]?.emailAddress}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login Required</h2>
            <p className="text-gray-600 mb-6">Please sign in with your administrator account to access admin features.</p>
            
            <SignInButton 
              mode="modal"
              forceRedirectUrl="/admin-login"
            >
              <button className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium mb-4">
                Admin Sign In
              </button>
            </SignInButton>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
              >
                Back to Home
              </button>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Admin access requires special permissions. Contact the system administrator if you need admin privileges.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">For Testing Purposes:</h3>
                <p className="text-sm text-blue-800">
                  After signing in, you'll need admin role assigned to your account. In a real application, this would be done through Clerk Dashboard or API.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin