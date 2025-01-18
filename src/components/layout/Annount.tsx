import React from 'react'

import Link from 'next/link'

import { Mail, MapPin, Phone } from 'lucide-react'

export default function Annount() {
    return (
        <div className='w-full h-full bg-primary flex justify-between items-center px-10 py-6'>
            <div className='flex items-center gap-7'>
                <a href="mailto:smkns@gmail.com" target='_blank' rel='noopener noreferrer' className='flex items-center gap-1 text-background'>
                    <Mail className='w-6 h-6' />
                    <p>smkns@gmail.com</p>
                </a>

                <a href="tel:+6281234567890" target='_blank' rel='noopener noreferrer' className='flex items-center gap-1 text-background'>
                    <Phone className='w-6 h-6' />
                    <p>+62 812 3456 7890</p>
                </a>

                <a href="https://maps.app.goo.gl/34567890" target='_blank' rel='noopener noreferrer' className='flex items-center gap-1 text-background'>
                    <MapPin className='w-6 h-6' />
                    <p>Jl. Raya Kediri, Kediri, Jawa Timur</p>
                </a>
            </div>

            <div className="">
                <Link href="/contact" className='text-background text-lg font-medium transition-all duration-300 relative after:content-[""] after:absolute after:0 after:h-0.5 after:bg-background after:bottom-0 after:left-0 hover:after:w-full'>Hubungi Kami</Link>
            </div>
        </div>
    )
}
