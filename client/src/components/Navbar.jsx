import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import logo from "../assets/logo.png"
import AuthButtons from './AuthButtons'



const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { user, isSignedIn } = useUser()

    const navigationItems = [
        { name: 'Home', path: '/' },
        { name: 'About Calmed', path: '/about' },
        { name: 'Paper & Resources', path: '/resources' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Who are We', path: '/WhoAreWe' }
    ]

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleNavigation = (path) => {
        navigate(path)
        setIsMobileMenuOpen(false) // Close mobile menu after navigation
    }

    const isActivePath = (path) => {
        return location.pathname === path
    }

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMobileMenuOpen])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <>
            {/* Top Navbar */}
            <div className='px-4 sm:px-6 lg:px-10 py-2 shadow-md bg-white relative z-50'>
                <div className='flex items-center justify-between px-3 py-2'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <img
                            src={logo}
                            width={140}
                            height={60}
                            alt="logo"
                            className="w-28 sm:w-32 lg:w-[140px] h-auto cursor-pointer"
                            onClick={() => handleNavigation('/')}
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex'>
                        <ul className='flex items-center gap-6 text-[rgba(0,85,149,1)] font-semibold'>
                            {navigationItems.map((item) => (
                                <li key={item.name} className="relative group cursor-pointer">
                                    <span
                                        className={`group-hover:after:w-full after:transition-all after:duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-600 ${isActivePath(item.path) ? 'after:w-full' : 'after:w-0'
                                            }`}
                                        onClick={() => handleNavigation(item.path)}
                                    >
                                        {item.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop Auth & Contact */}
                    <div className='hidden lg:flex items-center gap-4'>
                        <AuthButtons />
                        {isSignedIn && user?.publicMetadata?.role !== 'admin' && location.pathname !== '/admin-login' && (
                            <button
                                className='border-2 px-4 py-2 bg-blue-50 border-blue-200 rounded-2xl text-[rgba(0,85,149,1)] hover:bg-blue-100 transition-colors duration-200'
                                onClick={() => handleNavigation('/contact')}
                            >
                                Contact
                            </button>
                        )}


                    
                        {!isSignedIn && (
                            <button
                                className='px-4 py-2 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 transition-colors duration-200 font-medium'
                                onClick={() => handleNavigation('/admin-login')}
                            >
                                Admin Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='lg:hidden mobile-menu-container'>
                        <button
                            onClick={toggleMobileMenu}
                            className='p-2 rounded-md text-[rgba(0,85,149,1)] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200'
                            aria-label="Toggle mobile menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                {/* Mobile Sidebar */}
                <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out mobile-menu-container ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    {/* Sidebar Header */}
                    <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                        <img
                            src={logo}
                            width={120}
                            height={50}
                            alt="logo"
                            className="w-24 h-auto"
                        />
                        <button
                            onClick={toggleMobileMenu}
                            className='p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            aria-label="Close mobile menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className='py-6 flex flex-col h-full'>
                        <ul className='space-y-1 flex-1'>
                            {navigationItems.map((item) => (
                                <li key={item.name}>
                                    <button
                                        onClick={() => handleNavigation(item.path)}
                                        className={`w-full text-left px-6 py-4 text-lg font-semibold transition-all duration-200 relative ${isActivePath(item.path)
                                            ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600'
                                            : 'text-[rgba(0,85,149,1)] hover:bg-blue-50 hover:text-blue-600'
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Auth Section */}
                        <div className='px-6 py-4 border-t border-gray-200'>
                            <AuthButtons isMobile={true} />
                        </div>

                        {/* Mobile Contact & Admin Buttons */}
                        <div className='px-6 pb-6 space-y-3'>
                            {isSignedIn && user?.publicMetadata?.role !== 'admin' && location.pathname !== '/admin-login' && (
                                <button
                                    className='cursor-pointer w-full border-2 px-4 py-3 bg-blue-50 border-blue-200 rounded-2xl text-[rgba(0,85,149,1)] font-semibold hover:bg-blue-100 transition-colors duration-200'
                                    onClick={() => handleNavigation('/contact')}
                                >
                                    Contact
                                </button>
                            )}

                            {user?.publicMetadata?.role === 'admin' && (
                                <button
                                    className='w-full px-4 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors duration-200 font-medium'
                                    onClick={() => handleNavigation('/admin')}
                                >
                                    Admin Dashboard
                                </button>
                            )}
                            {!isSignedIn && (
                                <button
                                    className='w-full px-4 py-3 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 transition-colors duration-200 font-medium'
                                    onClick={() => handleNavigation('/admin-login')}
                                >
                                    Admin Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar