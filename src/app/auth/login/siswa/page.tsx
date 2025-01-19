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

export default function Siswa() {
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

                if (userData?.role === 'siswa') {
                    toast.success('Login berhasil!');
                    router.push('/dashboard/siswa');
                } else {
                    // If role is not siswa, sign out and show error
                    await signOut(auth);
                    toast.error('Akses ditolak. Anda bukan siswa.');
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
        <section className='min-h-screen flex relative'>
            <div className='container mx-auto px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className="flex flex-col gap-4 z-10 justify-center">
                    {/* Title */}
                    <div className="relative flex flex-col gap-7 max-w-[700px]">
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

                {/* Form */}

                <div className="flex flex-col gap-2 px-9 py-6 justify-center">
                    <div className="flex justify-end items-center gap-2 mb-[50px]">
                        <h3 className='text-gray-600 text-[16px]'><IoIosArrowBack /></h3>
                        <Link href="/auth/login" className='text-primary text-[16px]'>Back</Link>
                    </div>

                    <div className="flex flex-col gap-2 items-center justify-center w-full mb-10">
                        <h3 className="text-5xl font-bold mb-2">Login Siswa</h3>
                        <p className="text-gray-600 text-[16px]">Masukkan email dan password anda untuk masuk ke dalam sistem.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 w-full'>
                        <div className="lg:w-[85%] 2xl:w-[70%] mx-auto">
                            {errors.email && (
                                <p className="text-red-500 text-[14px] mb-2">{errors.email.message}</p>
                            )}

                            <input
                                type="email"
                                {...register('email')}
                                className='input input-bordered w-full h-[50px] bg-white border-gray-300'
                                placeholder='Email'
                            />
                        </div>

                        <div className="lg:w-[85%] 2xl:w-[70%] mx-auto">
                            {errors.password && (
                                <p className="text-red-500 text-[14px] mb-2">{errors.password.message}</p>
                            )}

                            <input
                                type="password"
                                {...register('password')}
                                className='input input-bordered w-full h-[50px] bg-white border-gray-300'
                                placeholder='Password'
                            />
                        </div>

                        <button
                            type="submit"
                            className='btn btn-primary h-[50px] mx-auto lg:w-[85%] 2xl:w-[70%]'
                        >
                            Login
                        </button>
                    </form>
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