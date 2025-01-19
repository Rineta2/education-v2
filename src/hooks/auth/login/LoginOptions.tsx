import React from 'react'

import Link from 'next/link'

import { PiStudentFill, PiChalkboardTeacher } from "react-icons/pi"

import LoginCard from '@/hooks/auth/login/LoginCard'

export default function LoginOptions() {
    return (
        <div className="px-9 flex flex-col gap-6 p-6">
            <div className="flex justify-end items-center gap-2 mt-10 md:mt-0 md:mb-20 md:order-2 order-1">
                <h3 className='text-gray-600 text-[16px]'>Belum punya akun?</h3>
                <Link href="/auth/register" className='text-primary text-[16px]'>Register</Link>
            </div>

            <div className="flex flex-col gap-4 md:order-2 order-1 mt-10 md:mt-0">
                <h3 className="lg:text-5xl md:text-3xl text-3xl font-bold mb-2">Login</h3>
                <p className="text-gray-600 text-[16px]">Masukkan email dan password anda untuk masuk ke dalam sistem.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-8 md:order-2 order-1">
                <LoginCard
                    href="/auth/login/siswa"
                    icon={PiStudentFill}
                    title="Siswa"
                    description="Masuk sebagai siswa."
                />
                <LoginCard
                    href="/auth/login/guru"
                    icon={PiChalkboardTeacher}
                    title="Guru"
                    description="Masuk sebagai guru."
                />
            </div>
        </div>
    )
}