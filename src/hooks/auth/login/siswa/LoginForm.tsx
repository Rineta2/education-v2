import React from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema, type LoginFormValues } from '@/hooks/schema/login/Schema'

interface LoginFormProps {
    onSubmit: (data: LoginFormValues) => Promise<void>
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema)
    })

    return (
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
                className='btn btn-primary text-background text-lg sm:text-xl w-full lg:w-[85%] 2xl:w-[70%] h-[45px] sm:h-[50px] mx-auto'
                style={{
                    letterSpacing: '2px'
                }}
            >
                Login
            </button>
        </form>
    )
}