import React from 'react'

import Link from 'next/link'

import { LoginCardProps } from "@/hooks/schema/login/Interface"

export default function LoginCard({ href, icon: Icon, title, description }: LoginCardProps) {
    return (
        <Link href={href} className="p-6 border rounded-lg hover:shadow-lg transition-all flex items-center gap-4 lg:w-[500px]">
            <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center">
                <Icon className='text-background w-[25px] h-[25px]' />
            </div>

            <div className="flex flex-col">
                <h3 className="font-semibold text-xl">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </Link>
    )
}