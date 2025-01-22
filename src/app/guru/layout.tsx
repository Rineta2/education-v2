"use client";

import { useAuth } from "@/utils/auth/AuthContext";
import { Role } from "@/utils/auth/schema/auth";
import { Fragment, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function GuruLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { hasRole, user } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!user || !hasRole(Role.GURU)) {
            window.location.href = '/';
            return;
        }
        setIsAuthorized(true);
    }, [hasRole, user]);

    // Jangan render apapun sampai authorization selesai
    if (!isAuthorized) {
        return null;
    }

    return (
        <Fragment>
            <Toaster />
            {children}
        </Fragment>
    );
}
