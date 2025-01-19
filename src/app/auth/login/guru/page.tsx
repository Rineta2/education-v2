"use client"

import React from 'react'

import Image from 'next/image'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema, type LoginFormValues } from '@/hooks/schema/login/Schema'

import quete from "@/components/assets/register/quete.png"

import vector from "@/components/assets/register/vector.png"

import frame from "@/components/assets/register/frame.png"

import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { auth } from '@/utils/firebase'

import { useRouter } from 'next/navigation'

import { FirebaseAuthError } from '@/hooks/schema/login/Interface'

import { toast } from 'react-hot-toast'

import { getDoc, doc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import Link from 'next/link'

import { IoIosArrowBack } from 'react-icons/io'

export default function Guru() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            if (userCredential.user) {
                // Get user role from Firestore
                const userDoc = await getDoc(doc(db, 'accounts', userCredential.user.uid));
                const userData = userDoc.data();

                if (userData?.role === 'guru') {
                    toast.success('Login berhasil!');
                    router.push('/dashboard/guru');
                } else {
                    // If role is not guru, sign out and show error
                    await signOut(auth);
                    toast.error('Akses ditolak. Anda bukan guru.');
                }
            }
        } catch (error: unknown) {
            console.error(error);
            if (error && typeof error === 'object' && 'code' in error) {
                const firebaseError = error as FirebaseAuthError;
                if (firebaseError.code === 'auth/invalid-credential') {
                    toast.error('Email atau password salah');
                } else {
                    toast.error('Terjadi kesalahan saat login');
                }
            }
        }
    };

    return (
        <section className='min-h-screen flex items-center justify-center relative'>
            <div className='container mx-auto px-3 sm:px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pl-0 sm:pl-0'>
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
                        <Link href="/auth/login" className='flex items-center text-background text-lg'><IoIosArrowBack size={16} /> Back</Link>
                    </div>
                </div>

                {/* Form */}
                <div className="flex flex-col sm:gap-4 gap-5 px-4 sm:px-9 py-4 sm:py-6 justify-center">
                    <div className="flex flex-col gap-2 items-center justify-center w-full mb-6 sm:mb-10">
                        <h3 className="text-2xl sm:text-4xl font-bold mb-2">Login Guru</h3>
                        <p className="text-gray-600 text-[12px] sm:text-[14px] text-center px-2">Masukkan email dan password anda untuk masuk ke dalam sistem.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 sm:gap-8 w-full'>
                        <div className="w-full lg:w-[85%] 2xl:w-[70%] mx-auto">
                            {errors.email && (
                                <p className="text-red-500 text-[12px] sm:text-[14px] mb-2">{errors.email.message}</p>
                            )}

                            <input
                                type="email"
                                {...register('email')}
                                className='input input-bordered w-full h-[45px] sm:h-[50px] bg-white border-gray-300'
                                placeholder='Email'
                            />
                        </div>

                        <div className="w-full lg:w-[85%] 2xl:w-[70%] mx-auto">
                            {errors.password && (
                                <p className="text-red-500 text-[12px] sm:text-[14px] mb-2">{errors.password.message}</p>
                            )}

                            <input
                                type="password"
                                {...register('password')}
                                className='input input-bordered w-full h-[45px] sm:h-[50px] bg-white border-gray-300'
                                placeholder='Password'
                            />
                        </div>

                        <button
                            type="submit"
                            className='btn btn-primary text-background text-lg sm:text-xl w-full lg:w-[85%] 2xl:w-[70%] h-[45px] sm:h-[50px] mx-auto' style={{
                                letterSpacing: '2px'
                            }}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>


        </section>
    )
}