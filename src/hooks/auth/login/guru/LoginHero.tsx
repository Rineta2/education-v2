import Image from 'next/image'

import quete from "@/components/assets/register/quete.png"

import vector from "@/components/assets/register/vector.png"

import frame from "@/components/assets/register/frame.png"

export const LoginHero = () => {
    return (
        <div className="flex-col gap-5 sm:gap-7 hidden sm:flex max-w-[300px] sm:max-w-[400px] lg:max-w-[600px] 2xl:max-w-[700px] p-4 sm:p-0">
            <div className="relative flex flex-col gap-5 sm:gap-7">
                <Image
                    src={quete}
                    alt='quete'
                    width={40}
                    height={40}
                    className='lg:block sm:w-[50px] sm:h-[50px]'
                />

                <h4 className='text-background text-[14px] sm:text-[16px] md:text-lg lg:text-xl font-bold' style={{
                    lineHeight: '1.8'
                }}>
                    The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.
                </h4>

                <h3 className='text-background text-lg sm:text-xl md:text-2xl font-bold'>Vincent Obi</h3>

                <Image
                    src={vector}
                    alt='vector'
                    width={40}
                    height={40}
                    className='lg:block absolute bottom-0 right-6'
                />
            </div>

            <div className="absolute inset-0 w-full md:w-[50%] h-full z-[-1] lg:block" >
                <Image
                    src={frame}
                    alt='background frame'
                    className='object-cover w-full h-full'
                />
            </div>
        </div>
    )
}