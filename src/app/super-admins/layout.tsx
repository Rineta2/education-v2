"use client";

import { useAuth } from "@/utils/auth/AuthContext";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";

export default function SuperAdminsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { accounts, isAuthenticated } = useAuth();

    // Don't render anything while checking authentication
    if (!isAuthenticated || accounts?.role !== "super_admin") {
        return null;
    }

    return (
        <Fragment>
            <Toaster />
            {children}
        </Fragment>
    );
} 