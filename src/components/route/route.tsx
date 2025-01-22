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

    const shouldHidePublicComponents = useCallback(() => {
        // Paths yang tidak menampilkan header, footer, dan announcement
        const publicPaths = [
            '/auth',
            '/super-admins',
            '/admins',
            '/guru',
            '/siswa'
        ];

        // Debug untuk production
        console.log('Route Check:', {
            pathname,
            publicPaths,
            isProtectedRoute: publicPaths.some(path =>
                pathname.toLowerCase().startsWith(path.toLowerCase())
            )
        });

        return publicPaths.some(path =>
            pathname.toLowerCase().startsWith(path.toLowerCase())
        );
    }, [pathname]);

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
            {/* Render children (dashboard) terlebih dahulu */}
            {children}

            {/* Render komponen publik jika bukan protected route */}
            {!shouldHidePublicComponents() && (
                <>
                    <Annount />
                    <Header />
                    <Footer />
                </>
            )}
        </Fragment>
    );
}
