import React from 'react'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Annount() {
    return (
        <div className='w-full bg-primary text-background'>
            <div className="container mx-auto py-4 px-4 sm:px-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className='flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-1'>
                        <a href="mailto:smkns@gmail.com"
                            className='flex items-center gap-2 hover:translate-y-[-2px] transition-all duration-300 group'>
                            <div className='p-2 rounded-full bg-background/10 group-hover:bg-background/20'>
                                <Mail className='w-4 h-4 md:w-5 md:h-5' />
                            </div>
                            <p className='text-sm md:text-base'>smkns@gmail.com</p>
                        </a>

                        <a href="tel:+6281234567890"
                            className='flex items-center gap-2 hover:translate-y-[-2px] transition-all duration-300 group'>
                            <div className='p-2 rounded-full bg-background/10 group-hover:bg-background/20'>
                                <Phone className='w-4 h-4 md:w-5 md:h-5' />
                            </div>
                            <p className='text-sm md:text-base'>+62 812 3456 7890</p>
                        </a>

                        <a href="https://maps.app.goo.gl/34567890"
                            className='flex items-center gap-2 hover:translate-y-[-2px] transition-all duration-300 group'>
                            <div className='p-2 rounded-full bg-background/10 group-hover:bg-background/20'>
                                <MapPin className='w-4 h-4 md:w-5 md:h-5' />
                            </div>
                            <p className='text-sm md:text-base'>Makassar, Sulawesi Selatan</p>
                        </a>
                    </div>

                    <Link href="/contact"
                        className='group flex items-center justify-center gap-1 text-base font-medium 
                        hover:translate-x-1 transition-all duration-300 mt-2 md:mt-0'>
                        <span>Hubungi Kami</span>
                        <span className='group-hover:translate-x-1 transition-all duration-300'>→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
