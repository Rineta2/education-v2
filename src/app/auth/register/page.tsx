import React from 'react'

import Image from 'next/image'

import quete from "@/components/assets/register/quete.png"

import vector from "@/components/assets/register/vector.png"

import Link from 'next/link'

import frame from "@/components/assets/register/frame.png"

import { PiStudentFill, PiChalkboardTeacher } from "react-icons/pi";

export default function Register() {
    return (
        <section className='min-h-screen flex relative'>
            <div className='container mx-auto px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className="flex flex-col gap-4 z-10 justify-center">
                    <div className="relative flex flex-col gap-7">
                        <Image
                            src={quete}
                            alt='quete'
                            width={50}
                            height={50}
                        />

                        <h4 className='text-background text-xl md:text-2xl font-bold' style={{
                            lineHeight: '2'
                        }}>
                            The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.
                        </h4>


                        <h3 className='text-background text-xl md:text-2xl font-bold'>Vincent Obi</h3>

                        <Image
                            src={vector}
                            alt='vector'
                            width={50}
                            height={50}
                            className='absolute bottom-0 right-6'
                        />
                    </div>
                </div>

                <div className="px-9 flex flex-col gap-6 p-6">

                    <div className="flex justify-end items-center gap-2 mb-20">
                        <h3 className='text-gray-600 text-[16px]'>Sudah punya akun?</h3>
                        <Link href="/auth/login" className='text-primary text-[16px]'>Login</Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-5xl font-bold mb-2">Join Us!</h3>
                        <p className="text-gray-600 text-[16px]">To begin this journey, tell us what type of account you’d be opening.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-8">
                        <Link href="/auth/register/siswa" className="p-6 border rounded-lg hover:shadow-lg transition-all flex items-center gap-4 w-[500px]">
                            <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center">
                                <PiStudentFill className='text-background w-[25px] h-[25px]' />
                            </div>

                            <div className="flex flex-col">
                                <h3 className="font-semibold text-xl">Siswa</h3>
                                <p className="text-gray-600">Daftar sebagai siswa.</p>
                            </div>
                        </Link>

                        <Link href="/auth/register/guru" className="p-6 border rounded-lg hover:shadow-lg transition-all flex items-center gap-4 w-[500px]">
                            <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center">
                                <PiChalkboardTeacher className='text-background w-[25px] h-[25px]' />
                            </div>

                            <div className="flex flex-col">
                                <h3 className="font-semibold text-xl">Guru</h3>
                                <p className="text-gray-600">Daftar sebagai guru.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 w-[50%] h-screen">
                <Image
                    src={frame}
                    alt='background frame'
                    fill
                    className='object-cover'
                />
            </div>
        </section>
    )
}