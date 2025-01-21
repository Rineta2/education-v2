"use client"

import LoginForm from '@/hooks/auth/login/super-admin/LoginForm'
import LoginHero from '@/hooks/auth/login/super-admin/LoginHero'
import { BackButton } from '@/hooks/auth/login/guru/BackButton'

export default function SuperAdminLogin() {
    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pl-0 sm:pl-0'>
                <div className="flex sm:flex-col sm:gap-4 z-10 sm:justify-center">
                    <LoginHero />
                    <BackButton />
                </div>

                <LoginForm />
            </div>
        </section>
    )
}