"use client"

import React from 'react'

import Image from 'next/image'

import quete from "@/components/assets/register/quete.png"

import vector from "@/components/assets/register/vector.png"

import Link from 'next/link'

import frame from "@/components/assets/register/frame.png"

import { IoIosArrowBack } from "react-icons/io";

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { guruSchema } from "@/hooks/schema/register/guru/Schema"

import { auth, db } from '@/utils/firebase'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { doc, setDoc } from 'firebase/firestore'

import { useRouter } from 'next/navigation'

import { FirebaseError } from 'firebase/app'

import { toast } from 'react-hot-toast'

import { GuruInterface } from "@/hooks/schema/register/guru/Interface"

import imageCompression from 'browser-image-compression';

import imagekitInstance from '@/utils/imageKit';

import * as z from "zod";

type GuruForm = z.infer<typeof guruSchema>

export default function Guru() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GuruForm>({
        resolver: zodResolver(guruSchema),
    })

    const onSubmit = async (data: GuruForm) => {
        try {
            let profilePictureUrl = '';
            if (data.profileImage) {
                console.log('Starting image compression...', data.profileImage);

                // Compress image
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true
                };
                const compressedFile = await imageCompression(data.profileImage, options);
                console.log('Image compressed:', compressedFile);

                // Convert to base64
                const reader = new FileReader();
                const base64Image = await new Promise<string>((resolve) => {
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(compressedFile);
                });
                console.log('Image converted to base64');

                try {
                    // Upload to ImageKit with organized folder structure
                    const uploadResponse = await imagekitInstance.upload({
                        file: base64Image,
                        fileName: `profile-${Date.now()}`,
                        folder: '/pictures/guru/profile',
                        tags: ['profile', 'guru'],
                    });
                    console.log('Image uploaded to ImageKit:', uploadResponse);

                    profilePictureUrl = uploadResponse.url;
                } catch (uploadError) {
                    console.error('ImageKit upload error:', uploadError);
                    throw uploadError;
                }
            }

            // Create authentication user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, profileImage, ...dataWithoutPassword } = data;

            const guruData: GuruInterface = {
                ...dataWithoutPassword,
                userId: userCredential.user.uid,
                createdAt: new Date().toISOString(),
                role: 'guru',
                isActive: true,
                lastLogin: new Date().toISOString(),
                profilePicture: profilePictureUrl
            };

            const collectionPath = process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS;
            if (!collectionPath) {
                throw new Error('Collection path is not defined in environment variables');
            }

            await setDoc(doc(db, collectionPath, userCredential.user.uid), guruData);

            // Show success message
            toast.success('Registrasi berhasil! Silahkan login.');

            // Add delay before redirect (3 seconds)
            setTimeout(() => {
                router.push('/auth/login/guru');
            }, 3000); // 3000ms = 3 seconds

        } catch (error) {
            console.error('Error in form submission:', error);
            if (error instanceof FirebaseError) {
                toast.error(error.message);
            } else {
                toast.error('Terjadi kesalahan yang tidak diketahui');
            }
        }
    }

    return (
        <section className='min-h-full w-full flex relative'>
            <div className='container mx-auto px-0 py-0 md:px-4 md:py-6 grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className="flex-col gap-4 z-10 justify-center lg:flex hidden">
                    <div className="relative flex flex-col gap-4">
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

                <div className="px-4 lg:px-0 p-4 lg:p-0 flex flex-col gap-6 w-full">
                    <div className="flex justify-end items-center gap-2">
                        <h3 className='text-gray-600 text-[16px]'><IoIosArrowBack /></h3>
                        <Link href="/auth/register" className='text-primary text-[16px]'>Back</Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-4xl md:text-5xl font-bold mb-2">Daftar Guru</h3>
                        <p className="text-gray-600 text-[14px] md:text-[18px]">Masukkan data diri anda untuk mendaftar sebagai guru.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="container grid grid-cols-1 gap-6">
                                <div className="w-full min-h-[4rem]">
                                    {errors.namaLengkap && (
                                        <span className="text-red-500 text-sm mb-1">{errors.namaLengkap.message}</span>
                                    )}
                                    <label className="input input-bordered flex items-center gap-2 h-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                        </svg>
                                        <input type="text" className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Nama Lengkap" {...register('namaLengkap')} />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full min-h-[4rem]">
                                        {errors.email && (
                                            <span className="text-red-500 text-sm mb-1">{errors.email.message}</span>
                                        )}
                                        <label className="input input-bordered flex items-center gap-2 h-16">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                            </svg>
                                            <input type="email" className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Email" {...register('email')} />
                                        </label>
                                    </div>

                                    <div className="w-full min-h-[4rem]">
                                        {errors.password && (
                                            <span className="text-red-500 text-sm mb-1">{errors.password.message}</span>
                                        )}
                                        <label className="input input-bordered flex items-center gap-2 h-16">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                            </svg>
                                            <input type="password" className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Password" {...register('password')} />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className='w-full min-h-[4rem]'>
                                        {errors.tempatLahir && (
                                            <span className="text-red-500 text-sm mb-1">{errors.tempatLahir.message}</span>
                                        )}
                                        <label className="input input-bordered flex items-center gap-2 w-full h-16">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                                <path d="M8 0a5 5 0 0 1 5 5c0 2.761-2.239 5-5 5S3 7.761 3 5a5 5 0 0 1 5-5z" />
                                            </svg>
                                            <input type="text" className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Tempat Lahir" {...register('tempatLahir')} />
                                        </label>

                                    </div>
                                    <div className='w-full min-h-[4rem]'>
                                        {errors.tanggalLahir && (
                                            <span className="text-red-500 text-sm mb-1">{errors.tanggalLahir.message}</span>
                                        )}
                                        <label className="input input-bordered flex items-center gap-2 w-full h-16">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                                <path d="M5.75 2a.75.75 0 0 0-.75.75v.25h3v-.25a.75.75 0 0 0-.75-.75h-1.5ZM15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954ZM1.75 4.5a.25.25 0 0 0-.25.25V7h9.5V4.75a.25.25 0 0 0-.25-.25h-9Z" />
                                            </svg>
                                            <input type="date" className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Tanggal Lahir" {...register('tanggalLahir')} />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full min-h-[4rem]">
                                        {errors.jenisKelamin && (
                                            <span className="text-red-500 text-sm mb-1">{errors.jenisKelamin.message}</span>
                                        )}
                                        <select className="select select-bordered w-full h-16 text-background:opacity-70 text-[16px] text-background" defaultValue="" {...register('jenisKelamin')}>
                                            <option value="" disabled>Pilih Jenis Kelamin</option>
                                            <option className='text-background text-[16px]'>Laki-laki</option>
                                            <option className='text-background text-[16px]'>Perempuan</option>
                                        </select>
                                    </div>

                                    <div className="w-full min-h-[4rem]">
                                        {errors.agama && (
                                            <span className="text-red-500 text-sm mb-1">{errors.agama.message}</span>
                                        )}
                                        <select className="select select-bordered w-full h-16 text-background:opacity-70 text-[16px] text-background" defaultValue="" {...register('agama')}>
                                            <option value="" disabled>Pilih Agama</option>
                                            <option className='text-background text-[16px]'>Islam</option>
                                            <option className='text-background text-[16px]'>Kristen</option>
                                            <option className='text-background text-[16px]'>Katolik</option>
                                            <option className='text-background text-[16px]'>Hindu</option>
                                            <option className='text-background text-[16px]'>Buddha</option>
                                            <option className='text-background text-[16px]'>Konghucu</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className='w-full min-h-[4rem]'>
                                        {errors.universitas && (
                                            <span className="text-red-500 text-sm mb-1">{errors.universitas.message}</span>
                                        )}
                                        <label className="input input-bordered flex items-center gap-2 w-full h-16">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                                <path d="M8 0L0 3v2.5h16V3L8 0zm0 1.25l5.5 2.063L8 5.375 2.5 3.313 8 1.25zM0 7v9h16V7H0zm2 2h12v5H2V9z" />
                                            </svg>
                                            <input type="text" className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Universitas" {...register('universitas')} />
                                        </label>
                                    </div>

                                    <div className='w-full min-h-[4rem]'>
                                        {errors.jurusan && (
                                            <span className="text-red-500 text-sm mb-1">{errors.jurusan.message}</span>
                                        )}
                                        <label className="input input-bordered flex items-center gap-2 w-full h-16">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                                <path d="M8 0L0 3v2.5h16V3L8 0zm0 1.25l5.5 2.063L8 5.375 2.5 3.313 8 1.25zM0 7v9h16V7H0zm2 2h12v5H2V9z" />
                                            </svg>
                                            <input type="text" className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Jurusan/Fakultas" {...register('jurusan')} />
                                        </label>
                                    </div>
                                </div>

                                <div className="w-full min-h-[4rem]">
                                    {errors.ipk && (
                                        <span className="text-red-500 text-sm mb-1">{errors.ipk.message}</span>
                                    )}
                                    <label className="input input-bordered flex items-center gap-2 h-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                            <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
                                        </svg>
                                        <input type="text" typeof='number' className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="IPK" {...register('ipk')} />
                                    </label>
                                </div>

                                <div className="w-full min-h-[100px]">
                                    {errors.alamat && (
                                        <span className="text-red-500 text-sm mb-1">{errors.alamat.message}</span>
                                    )}
                                    <label className="textarea textarea-bordered flex flex-col gap-2 min-h-[100px]">
                                        <span className="text-background opacity-70 text-[16px]">Alamat Lengkap</span>
                                        <textarea className="grow bg-transparent outline-none resize-none text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Masukkan alamat lengkap" {...register('alamat')}></textarea>
                                    </label>
                                </div>

                                <div className="w-full">
                                    {errors.telepon && (
                                        <span className="text-red-500 text-sm mb-1">{errors.telepon.message}</span>
                                    )}
                                    <label className="input input-bordered flex items-center gap-2 h-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70 text-background">
                                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        </svg>
                                        <input type="tel" className="grow text-background placeholder:text-background:opacity-70 text-[16px]" placeholder="Nomor HP" {...register('telepon')} />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="w-full min-h-[4rem]">
                                        {errors.tingkatan && (
                                            <span className="text-red-500 text-sm mb-1">{errors.tingkatan.message}</span>
                                        )}
                                        <select className="select select-bordered w-full h-16 text-background:opacity-70 text-[16px] text-background" defaultValue="Pilih Tingkatan" {...register('tingkatan')}>
                                            <option disabled>Pilih Tingkatan</option>
                                            <option className='text-background text-[16px]'>SD</option>
                                            <option className='text-background text-[16px]'>SMP</option>
                                            <option className='text-background text-[16px]'>SMA</option>
                                            <option className='text-background text-[16px]'>D3</option>
                                            <option className='text-background text-[16px]'>S1</option>
                                            <option className='text-background text-[16px]'>S2</option>
                                            <option className='text-background text-[16px]'>S3</option>
                                        </select>
                                    </div>

                                    <div className="w-full min-h-[4rem]">
                                        {errors.mataPelajaran && (
                                            <span className="text-red-500 text-sm mb-1">{errors.mataPelajaran.message}</span>
                                        )}
                                        <select className="select select-bordered w-full h-16 text-background:opacity-70 text-[16px] text-background" defaultValue="Pilih Mata Pelajaran" {...register('mataPelajaran')}>
                                            <option disabled>Pilih Mata Pelajaran</option>
                                            <option className='text-background text-[16px]'>Matematika</option>
                                            <option className='text-background text-[16px]'>IPA</option>
                                            <option className='text-background text-[16px]'>IPS</option>
                                            <option className='text-background text-[16px]'>Bahasa Indonesia</option>
                                            <option className='text-background text-[16px]'>Bahasa Inggris</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="w-full min-h-[4rem]">
                                    {errors.profileImage && (
                                        <span className="text-red-500 text-sm mb-1">{errors.profileImage.message}</span>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="file-input file-input-bordered file-input-primary w-full h-16 text-background placeholder:text-background:opacity-70 text-[16px]"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const { onChange } = register('profileImage');
                                                onChange({
                                                    target: {
                                                        value: file,
                                                        name: 'profileImage'
                                                    }
                                                });
                                            }
                                        }}
                                    />
                                </div>

                                <div className="w-full h-12 md:h-16 mt-4">
                                    <button type="submit" className="btn btn-primary w-full h-full text-white">
                                        Daftar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 w-1/2 h-full hidden lg:block">
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