"use client";

import { useAuth } from "@/utils/auth/AuthContext";

import { Fragment, useEffect, useState } from "react";

import Header from "@/components/layout/super-admins/Header"

export default function SuperAdminsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { checkRole } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        checkRole(process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN!);
    }, [checkRole]);

    return (
        <Fragment>
            <div className="flex min-h-screen bg-[#F8F9FC]">
                {/* Sidebar */}
                <div
                    className={`
                        fixed inset-0 lg:relative lg:inset-auto
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        lg:translate-x-0 transition-transform duration-300 ease-in-out
                        w-full lg:w-[280px] bg-white shadow-sm z-30
                    `}
                >
                    <Header setIsSidebarOpen={setIsSidebarOpen} />
                </div>

                {/* Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-20 animate-fade-in"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="flex-1 relative">
                    {/* Top Navigation Bar */}
                    <div className="h-14 md:h-16 bg-white border-b flex items-center justify-between px-3 md:px-4 lg:px-6">
                        {/* Left side */}
                        <div className="flex items-center gap-2 md:gap-4">
                            <button
                                className="lg:hidden p-1.5 md:p-2 hover:bg-gray-100 rounded-lg"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isSidebarOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                        }
                                    />
                                </svg>
                            </button>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-fit sm:w-[200px] md:w-[250px] lg:w-[300px] h-9 md:h-10 px-3 md:px-4 text-xs sm:text-sm rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <svg
                                    className="w-4 h-4 md:w-5 md:h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg">
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>
                            <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg">
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </Fragment>
    );
} 