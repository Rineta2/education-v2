"use client";

import React, { Fragment } from "react";

import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

import { usePathname } from "next/navigation";

import Annount from "@/components/layout/Annount";

import { Toaster } from "react-hot-toast";

export default function Route({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuth = pathname.includes("auth");
    const isSuperAdmin = pathname.includes("super-admins");
    const isAdmin = pathname.includes("admin");
    const isGuru = pathname.includes("guru");
    const isSiswa = pathname.includes("siswa");

    return (
        <Fragment>
            <Toaster position="top-center" />
            {!isAuth && !isSuperAdmin && !isAdmin && !isGuru && !isSiswa && <Annount />}
            {!isAuth && !isSuperAdmin && !isAdmin && !isGuru && !isSiswa && <Header />}
            {children}
            {!isAuth && !isSuperAdmin && !isAdmin && !isGuru && !isSiswa && <Footer />}
        </Fragment>
    );
}
