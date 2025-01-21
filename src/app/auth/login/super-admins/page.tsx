"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SuperAdminLoginForm } from '@/hooks/auth/login/super-admin/LoginForm'
import LoginHero from '@/hooks/auth/login/super-admin/LoginHero'
import { BackButton } from '@/hooks/auth/login/guru/BackButton'
import { useAuth } from '@/utils/auth/AuthContext'
import { handleSuperAdminLogin } from '@/hooks/schema/login/super-admins/superAdminAuth'

export default function SuperAdminLogin() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { login } = useAuth()

    const onSubmit = async (email: string, password: string) => {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)
            await handleSuperAdminLogin({ email, password }, router, login)
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pl-0 sm:pl-0'>
                <div className="flex sm:flex-col sm:gap-4 z-10 sm:justify-center">
                    <LoginHero />
                    <BackButton />
                </div>

                <SuperAdminLoginForm
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                />
            </div>
        </section>
    )
}