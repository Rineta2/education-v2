import React, { Fragment } from "react";

import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

import Annount from "@/components/layout/Annount";

export default function Route({ children }: { children: React.ReactNode }) {

    return (
        <Fragment>
            <Annount />
            <Header />
            {children}
            <Footer />
        </Fragment>
    );
}
