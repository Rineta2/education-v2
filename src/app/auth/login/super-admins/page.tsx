"use client"

import React from 'react'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema, type LoginFormValues } from '@/hooks/schema/login/Schema'

import { handleSuperAdminLogin } from '@/hooks/schema/login/super-admins/superAdminAuth'

import { SuperAdminLoginForm } from '@/hooks/auth/login/super-admin/LoginForm'

import LoginHero from '@/hooks/auth/login/super-admin/LoginHero'

import { BackButton } from '@/hooks/auth/login/guru/BackButton'

import { useAuth } from '@/utils/auth/AuthContext'

export default function SuperAdminLogin() {
    const router = useRouter();
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormValues) => {
        await handleSuperAdminLogin(data, router, login);
    };

    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pl-0 sm:pl-0'>
                <div className="flex sm:flex-col sm:gap-4 z-10 sm:justify-center">
                    <LoginHero />
                    <BackButton />
                </div>

                <SuperAdminLoginForm
                    register={register}
                    errors={errors}
                    onSubmit={handleSubmit(onSubmit)}
                />
            </div>
        </section>
    )
}