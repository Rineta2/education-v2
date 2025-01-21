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
    const isAuth = pathname.includes("auth");
    const isSuperAdmin = pathname.includes("super-admins");
    const isAdmin = pathname.includes("admin");
    const isGuru = pathname.includes("guru");
    const isSiswa = pathname.includes("siswa");

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
            {!isAuth && !isSuperAdmin && !isAdmin && !isGuru && !isSiswa && <Annount />}
            {!isAuth && !isSuperAdmin && !isAdmin && !isGuru && !isSiswa && <Header />}
            {children}
            {!isAuth && !isSuperAdmin && !isAdmin && !isGuru && !isSiswa && <Footer />}
        </Fragment>
    );
}
