import { LoginFormValues } from '@/hooks/schema/login/Schema'
import { FieldErrors, UseFormRegister, SubmitHandler } from 'react-hook-form'

interface SuperAdminLoginFormProps {
    register: UseFormRegister<LoginFormValues>
    errors: FieldErrors<LoginFormValues>
    onSubmit: SubmitHandler<LoginFormValues>
}

export const SuperAdminLoginForm = ({ register, errors, onSubmit }: SuperAdminLoginFormProps) => {
    return (
        <div className="flex flex-col sm:gap-4 gap-5 px-4 sm:px-9 py-4 sm:py-6 justify-center">
            <div className="flex flex-col gap-2 items-center justify-center w-full mb-6 sm:mb-10">
                <h3 className="text-2xl sm:text-4xl font-bold mb-2">Login Super Admin</h3>
                <p className="text-gray-600 text-[12px] sm:text-[14px] text-center px-2">
                    Masukkan email dan password anda untuk masuk ke dalam sistem.
                </p>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onSubmit({
                    email: formData.get('email') as string,
                    password: formData.get('password') as string,
                });
            }} className='flex flex-col gap-6 sm:gap-8 w-full'>
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
                    style={{ letterSpacing: '2px' }}
                >
                    Login
                </button>
            </form>
        </div>
    )
}