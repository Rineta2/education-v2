"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

import { Toaster } from "react-hot-toast";

import Annount from "@/components/layout/Annount";

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // Check for all dashboard/admin routes
    const isAdminRoute = pathname.includes("/super-admin") ||
        pathname.includes("/admin") ||
        pathname.includes("/guru") ||
        pathname.includes("/siswa") ||
        pathname.includes("/auth");

    return (
        <main>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    success: {
                        style: {
                            background: '#22c55e',
                        },
                    },
                    error: {
                        style: {
                            background: '#ef4444',
                        },
                    },
                }}
            />
            {!isAdminRoute && <Annount />}
            {!isAdminRoute && <Header />}
            {children}
            {!isAdminRoute && <Footer />}
        </main>
    );
};

export default Pathname;