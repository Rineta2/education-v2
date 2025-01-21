import React from 'react';

import { useAuth } from '@/utils/auth/AuthContext';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import Image from 'next/image';

import { menuItems } from "@/components/data/header/super-admins/Header"

interface HeaderProps {
    setIsSidebarOpen?: (isOpen: boolean) => void;
}

export default function Header({ setIsSidebarOpen }: HeaderProps) {
    const { accounts, logout } = useAuth();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    const handleLinkClick = () => {
        // Close sidebar on mobile when link is clicked
        if (setIsSidebarOpen) {
            setIsSidebarOpen(false);
        }
        // Also close any open dropdowns
        setActiveDropdown(null);
    };

    const isLinkActive = (href: string) => {
        // Exact match for root path
        if (href === '/') {
            return pathname === href;
        }
        // Exact match for dashboard
        if (href === '/super-admins/dashboard') {
            return pathname === href;
        }
        // For other routes, check if pathname starts with href but not for root path
        return href !== '/' && pathname.startsWith(href);
    };

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <div className="h-full flex flex-col">

            {/* Profile Section */}
            <div className="p-4 mt-2 mb-2 border-b">
                <div className="flex items-center gap-3">
                    <Image
                        src={accounts?.profilePicture || '/images/default-profile.png'}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-14 h-14"
                    />
                    <div>
                        <p className="text-[16px] font-medium text-gray-900">{accounts?.namaLengkap}</p>
                        <p className="text-[12px] text-gray-500">Super Admin</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-2 overflow-y-auto">
                <ul className="space-y-1">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.subItems ? (
                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isLinkActive(item.href)
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${item.subItems?.some(subItem => isLinkActive(subItem.href))
                                            ? 'bg-primary text-white hover:bg-primary/90'
                                            : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-200 ${activeDropdown === index ? 'max-h-40' : 'max-h-0'}`}>
                                        <ul className="mt-1 space-y-1 px-10">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={handleLinkClick}
                                                        className={`block py-2 text-sm rounded-md transition-colors ${isLinkActive(subItem.href)
                                                            ? 'text-primary font-medium bg-primary/5'
                                                            : 'text-gray-500 hover:text-primary hover:bg-primary/5'
                                                            }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button - Replacing Upgrade Banner */}
            <div className="p-4 border-t">
                <button
                    onClick={() => {
                        logout();
                        handleLinkClick(); // Close sidebar when logging out
                    }}
                    className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors"
                >
                    <FiLogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
