import React from 'react'

import RegisterHeading from '@/hooks/auth/register/RegisterHeading'

import RegisterOptions from '@/hooks/auth/register/RegisterOptions'

import HomeButton from '@/hooks/auth/register/HomeButton'

export default function Register() {
    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 sm:gap-6 pl-0 sm:pl-0'>
                <div className="flex sm:flex-col sm:gap-4 z-10 sm:justify-center">
                    <RegisterHeading />
                    <HomeButton />
                </div>

                <RegisterOptions />
            </div>
        </section>
    )
}