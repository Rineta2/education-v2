import React, { useState } from 'react';
import { auth } from '@/utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/utils/auth/AuthContext';
import { User } from '@/utils/auth/schema/interface';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userData: User = {
                email: user.email!,
                role: 'super_admins',
                namaLengkap: user.displayName || 'Super Admin',
            };

            await login(userData);
            router.replace('/super-admins/dashboard');
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof FirebaseError) {
                setError(err.message);
            } else {
                setError('Invalid email or password');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col sm:gap-4 gap-5 px-4 sm:px-9 py-4 sm:py-6 justify-center bg-white rounded-lg shadow-md">
            <div className="flex flex-col gap-2 items-center justify-center w-full mb-6 sm:mb-10">
                <h3 className="text-2xl sm:text-4xl font-bold mb-2">Login Super Admin</h3>
                <p className="text-gray-600 text-[12px] sm:text-[14px] text-center px-2">
                    Masukkan email dan password anda untuk masuk ke dalam sistem.
                </p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6 sm:gap-8 w-full'>
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="w-full lg:w-[85%] 2xl:w-[70%] mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input input-bordered w-full h-[45px] sm:h-[50px] bg-white border-gray-300'
                        placeholder='Email'
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="w-full lg:w-[85%] 2xl:w-[70%] mx-auto">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input input-bordered w-full h-[45px] sm:h-[50px] bg-white border-gray-300'
                        placeholder='Password'
                        required
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    className='btn btn-primary text-white text-lg sm:text-xl w-full lg:w-[85%] 2xl:w-[70%] h-[45px] sm:h-[50px] mx-auto'
                    style={{ letterSpacing: '2px' }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}
