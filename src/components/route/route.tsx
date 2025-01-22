"use client";

import React, { Fragment, useEffect, useCallback } from "react";

import { Toaster } from "react-hot-toast";

import { useNotification } from "@/hooks/useNotification";

export default function Route() {
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
        </Fragment>
    );
}
