import React from 'react'

import RegisterHeader from '@/hooks/auth/register/RegisterHeader'

import RegisterOptions from '@/hooks/auth/register/RegisterOptions'

export default function Register() {
    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 sm:gap-6 pl-0 sm:pl-0'>
                <RegisterHeader />

                <RegisterOptions />
            </div>
        </section>
    )
}