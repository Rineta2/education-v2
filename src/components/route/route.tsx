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

    return (
        <Fragment>
            <Toaster position="top-center" />
            {!isAuth && <Annount />}
            {!isAuth && <Header />}
            {children}
            {!isAuth && <Footer />}
        </Fragment>
    );
}
