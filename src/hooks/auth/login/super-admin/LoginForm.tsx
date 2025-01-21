import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface SuperAdminLoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>
    isSubmitting: boolean
}

export const SuperAdminLoginForm = ({ onSubmit, isSubmitting }: SuperAdminLoginFormProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const validateForm = () => {
        if (!email) {
            toast.error('Email wajib diisi')
            return false
        }

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        if (!emailRegex.test(email)) {
            toast.error('Email tidak valid')
            return false
        }

        if (!password) {
            toast.error('Password wajib diisi')
            return false
        }

        if (password.length < 6) {
            toast.error('Password minimal 6 karakter')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            await onSubmit(email, password)
        }
    }

    return (
        <div className="flex flex-col sm:gap-4 gap-5 px-4 sm:px-9 py-4 sm:py-6 justify-center">
            <div className="flex flex-col gap-2 items-center justify-center w-full mb-6 sm:mb-10">
                <h3 className="text-2xl sm:text-4xl font-bold mb-2">Login Super Admin</h3>
                <p className="text-gray-600 text-[12px] sm:text-[14px] text-center px-2">
                    Masukkan email dan password anda untuk masuk ke dalam sistem.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-6 sm:gap-8 w-full'
                noValidate
                autoComplete="off"
            >
                <div className="w-full lg:w-[85%] 2xl:w-[70%] mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input input-bordered w-full h-[45px] sm:h-[50px] bg-white border-gray-300'
                        placeholder='Email'
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="w-full lg:w-[85%] 2xl:w-[70%] mx-auto">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input input-bordered w-full h-[45px] sm:h-[50px] bg-white border-gray-300'
                        placeholder='Password'
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className='btn btn-primary text-background text-lg sm:text-xl w-full lg:w-[85%] 2xl:w-[70%] h-[45px] sm:h-[50px] mx-auto'
                    style={{ letterSpacing: '2px' }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>
            </form>
        </div>
    )
}