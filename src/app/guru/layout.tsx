"use client";

import { useAuth } from "@/utils/auth/AuthContext";

import { Fragment } from "react";

import { Toaster } from "react-hot-toast";

export default function GuruLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { hasRole } = useAuth();

    // Don't render anything while checking authentication
    if (!hasRole("guru")) {
        return null;
    }

    return (
        <Fragment>
            <Toaster />
            {children}
        </Fragment>
    );
}
