"use client"

import Link from 'next/link'
import Image from 'next/image'

import React, { useState } from 'react'

import { NavLinks } from '@/components/data/header/Header'

import { usePathname } from 'next/navigation'

import { AlignJustify } from "lucide-react"

import { useAuth } from '@/utils/auth/AuthContext'

export default function Header() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { isAuthenticated, accounts, logout } = useAuth();

    // Tambahkan state untuk tracking error gambar
    const [imageError, setImageError] = useState(false);

    const toggleDropdown = (id: string) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const pathname = usePathname()

    // Function to get dashboard URL based on user role
    const getDashboardUrl = () => {
        if (!accounts?.role) return '/';
        return `/${accounts.role}/dashboard`;
    };


    return (
        <header className='sticky top-0 left-0 right-0 z-50 w-full bg-background px-5 py-4'>
            <div className="flex justify-between items-center container">
                <h1 className='text-3xl font-bold text-primary' style={{ letterSpacing: '0.1em' }}>
                    SM<span className='text-title'>KNS</span>
                </h1>

                {/* Desktop Navigation */}
                <ul className='hidden lg:flex items-center gap-10 lg:gap-20'>
                    {NavLinks.map((link) => (
                        <li key={link.id} className="relative">
                            {link.submenu ? (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(link.name)}
                                        className={`flex items-center gap-1 text-[16px] ${pathname.startsWith(link.href) ? 'text-primary font-medium' : 'text-title'
                                            }`}
                                    >
                                        {link.name}
                                        <svg className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {activeDropdown === link.name && (
                                        <ul className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                                            {link.submenu.map((subItem) => (
                                                <li key={subItem.id}>
                                                    <Link
                                                        href={subItem.href}
                                                        className={`block px-4 py-2 hover:bg-gray-100 ${pathname === subItem.href ? 'text-primary font-medium' : ''
                                                            }`}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`text-[16px] ${pathname === link.href ? 'text-primary font-medium' : 'text-title'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Login/User Menu Button for Desktop */}
                {isAuthenticated ? (
                    <div className="hidden lg:flex items-center gap-4 relative">
                        <button
                            onClick={() => toggleDropdown('profile')}
                            className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg"
                        >
                            {accounts?.profilePicture && !imageError ? (
                                <Image
                                    src={accounts.profilePicture}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-600 text-sm font-medium">
                                        {accounts?.namaLengkap?.charAt(0) || 'U'}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-medium text-title">{accounts?.namaLengkap}</span>
                            </div>
                        </button>

                        {activeDropdown === 'profile' && (
                            <ul className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                                <li>
                                    <Link
                                        href={getDashboardUrl()}
                                        className="block px-4 py-2 text-sm text-title hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/${accounts?.role}/profile`}
                                        className="block px-4 py-2 text-sm text-title hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/auth/login"
                        className="xl:ml-10 gap-5 btn bg-primary duration-300 px-10 hover:bg-primary/80 rounded-full grid place-items-center"
                    >
                        <span className='text-background text-lg'>Login</span>
                    </Link>
                )}

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden text-title"
                >
                    <AlignJustify />
                </button>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-background border-t border-border/40 shadow-lg animate-in slide-in-from-top">
                        <ul className="container py-8 px-6 space-y-6">
                            {NavLinks.map((link) => (
                                <li key={link.id}>
                                    {link.submenu ? (
                                        <div className="space-y-4">
                                            <button
                                                onClick={() => toggleDropdown(link.name)}
                                                className={`flex items-center justify-between w-full hover:text-primary transition-colors ${pathname.startsWith(link.href) ? 'text-primary font-medium' : 'text-title'}`}
                                            >
                                                <span className="text-[16px] font-medium">{link.name}</span>
                                                <svg
                                                    className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {activeDropdown === link.name && (
                                                <ul className="pl-4 space-y-3 border-l border-border/60">
                                                    {link.submenu.map((subItem) => (
                                                        <li key={subItem.id}>
                                                            <Link
                                                                href={subItem.href}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className={`block text-[14px] hover:text-primary transition-colors ${pathname === subItem.href ? 'text-primary font-medium' : 'text-text'}`}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block text-[16px] font-medium hover:text-primary transition-colors ${pathname === link.href ? 'text-primary' : 'text-title'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                            <li className="pt-4">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 mb-4">
                                            {accounts?.profilePicture && !imageError ? (
                                                <Image
                                                    src={accounts.profilePicture}
                                                    alt="Profile"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover"
                                                    onError={() => setImageError(true)}
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-600 text-sm font-medium">
                                                        {accounts?.namaLengkap?.charAt(0) || 'U'}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-title">{accounts?.namaLengkap}</span>
                                                <span className="text-xs text-gray-500">{accounts?.role}</span>
                                            </div>
                                        </div>
                                        <Link
                                            href={getDashboardUrl()}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full text-[16px] font-medium text-title hover:text-primary"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={`${accounts?.role}/profile`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full text-[16px] font-medium text-title hover:text-primary"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="block w-full text-left text-[16px] font-medium text-red-600 hover:text-red-700"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/auth/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full btn bg-primary text-center duration-300 py-3 hover:bg-primary/90 rounded-full"
                                    >
                                        <span className="text-background text-lg font-medium">Login</span>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}
