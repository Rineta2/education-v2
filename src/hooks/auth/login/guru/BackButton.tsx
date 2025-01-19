import Link from 'next/link'

import { IoIosArrowBack } from 'react-icons/io'

export const BackButton = () => {
    return (
        <div className="absolute top-4 right-4 btn bg-primary text-background border-none">
            <Link href="/auth/login" className='flex items-center text-background text-lg'>
                <IoIosArrowBack size={16} /> Back
            </Link>
        </div>
    )
}