import React from 'react'

import LoginHeading from '../../../hooks/auth/login/LoginHeading'

import LoginOptions from '../../../hooks/auth/login/LoginOptions'

export default function Login() {
    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 sm:gap-6 pl-0 sm:pl-0'>
                <LoginHeading />

                <LoginOptions />
            </div>
        </section>
    )
}