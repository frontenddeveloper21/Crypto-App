import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
const Footer = () => {
    return (
        <div className='p-20 flex items-center gap-x-40 2xl:gap-x-80'>
            <div>
                <div className="text-2xl font-bold">
                    <span className="crypto_text">Haoda</span>
                    <span className="cap_text text-[#366FFF]">Cash</span>
                </div>

                <div className='flex gap-2 pt-[65px]'>
                    <a href='#' className='footer_icon'><FaInstagram /></a>
                    <a href='#' className='footer_icon'><FaFacebook /></a>
                    <a href='#' className='footer_icon'><FaTwitter /></a>
                    <a href='#' className='footer_icon'><IoLogoYoutube /></a>
                </div>

                <span className='text-sm block pt-[32px] '>2021 CoinMarketCap. All rights reserved</span>
            </div>

            <div className='flex gap-10 2xl:gap-40'>
                <div className='flex flex-col gap-5'>
                    <a className='font-semibold text-lg'>About Us</a>
                    <a className='opacity-50 text-sm'>About</a>
                    <a className='opacity-50 text-sm'>Career</a>
                    <a className='opacity-50 text-sm'>Blog</a>
                    <a className='opacity-50 text-sm'>Legel Policy</a>
                </div>

                <div  className='flex flex-col gap-5'>
                    <a className='font-semibold text-lg'>About Us</a>
                    <a className='opacity-50 text-sm'>Applications</a>
                    <a className='opacity-50 text-sm'>Buy Crypto</a>
                    <a className='opacity-50 text-sm'>Affilliate</a>
                    <a className='opacity-50 text-sm'>Institutional Services</a>
                </div>

                <div className='flex flex-col gap-5'>
                    <a className='font-semibold text-lg'>About Us</a>
                    <a className='opacity-50 text-sm'>    What is Cryptocurrency?</a>
                    <a className='opacity-50 text-sm'>Crypto Basics</a>
                    <a className='opacity-50 text-sm'>Tips & Tutorials</a>
                    <a className='opacity-50 text-sm'>Market Update</a>
                </div>
            </div>
        </div>
    )
}

export default Footer