"use client"

import React from 'react'

import { useRouter } from 'next/navigation'

import { LoginForm } from '@/hooks/auth/login/siswa/LoginForm'

import { handleSiswaLogin } from '@/hooks/schema/login/siswa/siswaAuth'

import { LoginFormValues } from '@/hooks/schema/login/Schema'

import LoginHero from '@/hooks/auth/login/siswa/LoginHero'

import { BackButton } from '@/hooks/auth/login/guru/BackButton'

export default function Siswa() {
    const router = useRouter();

    const handleSubmit = async (data: LoginFormValues) => {
        const success = await handleSiswaLogin(data);
        if (success) {
            router.push('/dashboard/siswa');
        }
    };

    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 sm:gap-6 pl-0 sm:pl-0'>
                <div className="flex sm:flex-col sm:gap-4 z-10 sm:justify-center">
                    {/* Title */}
                    <LoginHero />

                    <BackButton />
                </div>

                {/* Form */}

                <div className="flex flex-col sm:gap-4 gap-5 px-4 sm:px-9 py-4 sm:py-6 justify-center">
                    <div className="flex flex-col gap-2 items-center justify-center w-full mb-6 sm:mb-10">
                        <h3 className="text-2xl sm:text-4xl font-bold mb-2">Login Siswa</h3>
                        <p className="text-gray-600 text-[12px] sm:text-[14px] text-center px-2">Masukkan email dan password anda untuk masuk ke dalam sistem.</p>
                    </div>

                    <LoginForm onSubmit={handleSubmit} />
                </div>
            </div>
        </section>
    )
}