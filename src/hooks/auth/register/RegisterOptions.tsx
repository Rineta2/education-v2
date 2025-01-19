import React from 'react'

import Link from 'next/link'

import { PiStudentFill, PiChalkboardTeacher } from "react-icons/pi"

import RegisterCard from '@/hooks/auth/register/RegisterCard'

export default function RegisterOptions() {
    return (
        <div className="px-9 flex flex-col gap-6 p-6">
            <div className="flex justify-end items-center gap-2 mt-10 md:mt-0 md:mb-20 md:order-2 order-1">
                <h3 className='text-gray-600 text-[16px]'>Sudah punya akun?</h3>
                <Link href="/auth/login" className='text-primary text-[16px]'>Login</Link>
            </div>

            <div className="flex flex-col gap-4 md:order-2 order-1 mt-10 md:mt-0">
                <h3 className="lg:text-5xl md:text-3xl text-3xl font-bold mb-2">Register</h3>
                <p className="text-gray-600 text-[16px]">Masukkan email dan password anda untuk mendaftar ke dalam sistem.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-8 md:order-2 order-1">
                <RegisterCard
                    href="/auth/register/siswa"
                    icon={PiStudentFill}
                    title="Siswa"
                    description="Masuk sebagai siswa."
                />
                <RegisterCard
                    href="/auth/register/guru"
                    icon={PiChalkboardTeacher}
                    title="Guru"
                    description="Masuk sebagai guru."
                />
            </div>
        </div>
    )
}