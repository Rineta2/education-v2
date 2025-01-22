"use client";

import React, { Fragment, useEffect, useCallback } from "react";

import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

import { usePathname } from "next/navigation";

import Annount from "@/components/layout/Annount";

import { Toaster } from "react-hot-toast";

import { useNotification } from "@/hooks/useNotification";

export default function Route({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Ubah logika untuk menampilkan komponen
    const shouldShowPublicComponents = useCallback(() => {
        // Sesuaikan dengan path yang digunakan di AuthContext dan middleware
        const protectedPaths = [
            '/auth',
            '/super-admins', // sesuai dengan redirect di AuthContext
            '/admins',       // sesuai dengan redirect di AuthContext
            '/guru',        // sesuai dengan redirect di AuthContext
            '/siswa'        // sesuai dengan redirect di AuthContext
        ];

        // Debug untuk production
        console.log('Route Check:', {
            pathname,
            protectedPaths,
            matchFound: protectedPaths.some(path =>
                pathname.toLowerCase().startsWith(path.toLowerCase())
            )
        });

        return !protectedPaths.some(path =>
            pathname.toLowerCase().startsWith(path.toLowerCase())
        );
    }, [pathname]);

    // Debug untuk production
    console.log('Current pathname:', pathname);
    console.log('Should show public components:', shouldShowPublicComponents());

    const { requestPermission, subscribeToNotifications, checkNotificationStatus } = useNotification();

    const setupNotifications = useCallback(async () => {
        const status = await checkNotificationStatus();
        if (status.supported && !status.subscriptionActive) {
            const granted = await requestPermission();
            if (granted) {
                await subscribeToNotifications();
            }
        }
    }, [checkNotificationStatus, requestPermission, subscribeToNotifications]);

    useEffect(() => {
        setupNotifications();
    }, [setupNotifications]);

    return (
        <Fragment>
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
            {/* Render komponen berdasarkan kondisi */}
            {shouldShowPublicComponents() && <Annount />}
            {shouldShowPublicComponents() && <Header />}
            {children}
            {shouldShowPublicComponents() && <Footer />}
        </Fragment>
    );
}
