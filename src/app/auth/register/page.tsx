import React from 'react'

import Image from 'next/image'

import quete from "@/components/assets/register/quete.png"

import vector from "@/components/assets/register/vector.png"

import Link from 'next/link'

import frame from "@/components/assets/register/frame.png"

import { PiStudentFill, PiChalkboardTeacher } from "react-icons/pi";

import { IoIosArrowBack } from 'react-icons/io'

export default function Register() {

    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 sm:gap-6 pl-0 sm:pl-0'>
                <div className="flex sm:flex-col sm:gap-4 z-10 sm:justify-center">
                    {/* Title */}
                    <div className="flex-col gap-5 sm:gap-7 hidden sm:flex max-w-[300px] sm:max-w-[400px] lg:max-w-[600px] 2xl:max-w-[700px] p-4 sm:p-0">
                        <div className="relative flex flex-col gap-5 sm:gap-7">
                            <Image
                                src={quete}
                                alt='quete'
                                width={40}
                                height={40}
                                className='lg:block sm:w-[50px] sm:h-[50px]'
                            />

                            <h4 className='text-background text-[14px] sm:text-[16px] md:text-lg lg:text-xl font-bold' style={{
                                lineHeight: '1.8'
                            }}>
                                The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.
                            </h4>

                            <h3 className='text-background text-lg sm:text-xl md:text-2xl font-bold'>Vincent Obi</h3>

                            <Image
                                src={vector}
                                alt='vector'
                                width={40}
                                height={40}
                                className='lg:block absolute bottom-0 right-6'
                            />
                        </div>

                        <div className="absolute inset-0 w-full md:w-[50%] h-full z-[-1] lg:block" >
                            <Image
                                src={frame}
                                alt='background frame'
                                className='object-cover w-full h-full'
                            />
                        </div>
                    </div>

                    <div className="absolute top-4 right-4 btn bg-primary text-background border-none">
                        <Link href="/auth/login" className='flex items-center text-background text-lg'><IoIosArrowBack size={16} /> Home</Link>
                    </div>
                </div>

                <div className="px-9 flex flex-col gap-6 p-6">
                    <div className="flex justify-end items-center gap-2 mt-10 md:mt-0 md:mb-20 md:order-2 order-1">
                        <h3 className='text-gray-600 text-[16px]'>Sudah punya akun?</h3>
                        <Link href="/auth/login" className='text-primary text-[16px]'>Login</Link>
                    </div>

                    <div className="flex flex-col gap-4 md:order-2 order-1 mt-10 md:mt-0">
                        <h3 className="lg:text-5xl md:text-3xl text-3xl font-bold mb-2">Register</h3>
                        <p className="text-gray-600 text-[16px]">Daftar sebagai siswa atau guru.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-8 md:order-2 order-1">
                        <Link href="/auth/register/siswa" className="p-6 border rounded-lg hover:shadow-lg transition-all flex items-center gap-4 lg:w-[500px]">
                            <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center">
                                <PiStudentFill className='text-background w-[25px] h-[25px]' />
                            </div>

                            <div className="flex flex-col">
                                <h3 className="font-semibold text-xl">Siswa</h3>
                                <p className="text-gray-600">Daftar sebagai siswa.</p>
                            </div>
                        </Link>

                        <Link href="/auth/register/guru" className="p-6 border rounded-lg hover:shadow-lg transition-all flex items-center gap-4 lg:w-[500px]">
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
        </section>
    )
}