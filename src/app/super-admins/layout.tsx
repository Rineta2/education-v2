"use client";

import { useAuth } from "@/utils/auth/AuthContext";

import { useRouter } from "next/navigation";

import { Fragment, useEffect } from "react";

import { Toaster } from "react-hot-toast";

export default function SuperAdminsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { accounts, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || accounts?.role !== process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN) {
            router.push("/");
        }
    }, [isAuthenticated, accounts, router]);

    // Don't render anything while checking authentication
    if (!isAuthenticated || accounts?.role !== process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN) {
        return null;
    }

    return (
        <Fragment>
            <Toaster />
            {children}
        </Fragment>
    );
} 