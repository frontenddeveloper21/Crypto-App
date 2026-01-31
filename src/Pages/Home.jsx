import React from 'react'
import "../Style/Home.css"
import bitcoin from "../assets/bitcoin.png"
import bitcoin2 from "../assets/bitcoin-2.png"
import bitcoin3 from "../assets/bitcoin-3.png"
import bitcoin4 from "../assets/bitcoin-4.png"
import chart from "../assets/chart-state.png"
import featureImg1 from "../assets/feature-image.png"
import featureImg2 from "../assets/feature-image2.png"
import featureImg3 from "../assets/feature-image3.png"
import featureImg4 from "../assets/feature-image4.png"
import start1 from "../assets/started-icon.png"
import start2 from "../assets/started-icon2.png"
import start3 from "../assets/started-icon2.png"
import { MdArrowOutward, MdOutlineArrowRightAlt } from "react-icons/md";
import { FileSearch } from 'lucide-react'
import { FiSearch } from 'react-icons/fi'
import thumbnail from "../assets/Thumbnail.png"
import thumbnail2 from "../assets/Thumbnail2.png"
import thumbnail3 from "../assets/Thumbnail3.png"
import thumbnail4 from "../assets/Thumbnail4.png"
import thumbnail5 from "../assets/Thumbnail5.png"
import thumbnail6 from "../assets/Thumbnail6.png"
import Footer from './Footer'

const Home = () => {
    return (
    <>
        <div className='container mx-auto'>
            <div className='flex justify-center flex-col items-center pt-10'>
                <div className='home_banner_bg_img relative'>
                </div>
                <div className='home_banner_bg absolute left-[100px] opacity-30 top-[100px]'></div>
                <div className='py-14 items-center top-[300px] absolute'>
                        <div className='home_banner_heading'>Start and Build Your Crypto Portfolio Here</div>
                        <div className='flex justify-center pt-3'> <div className='w-[420px] text-center'>Only at CryptoCap, you can build a good portfolio and learn best practices about cryptocurrency.</div></div>
                        <div className='flex justify-center items-center pt-10'>
                            <button className='home_banner_btn cursor-pointer'><a href='https://cryptouat.crypto-edv.pages.dev/sign-up'>Get Started</a></button>
                        </div>
                    </div>
                <div className='w-full px-20 pb-5'>
                    <span className='text-left'>Market Trend</span>
                </div>

                <div className='flex justify-center items-center pb-20 gap-6'>
                    <div className='market_trend_box'>
                        <div className='flex items-center border-b pb-4 border-[#ECF1F0] gap-16'>
                            <div className='flex gap-3 items-center'>
                                <img className='bitcoin_img' src={bitcoin} />
                                <span className='bit_text'>BIT</span>
                                <button className='bitcoin_text'>BITCOIN</button>
                            </div>
                            <div>
                                <button className='rounded-full text-lg p-2'> <MdArrowOutward /></button>
                            </div>
                        </div>
                        <div className='flex gap-2.5 justify-between items-center'>
                            <div className='flex w-40 flex-col gap-3'>
                                <span className='amount_text'>$56,623.54</span>
                                <span className='percentage_text'>1.41%</span>
                            </div>
                            <div>
                                <img className='chart_img' src={chart} />
                            </div>
                        </div>
                    </div>


                    <div className='market_trend_box'>
                        <div className='flex items-center border-b pb-4 border-[#ECF1F0] gap-16'>
                            <div className='flex gap-3 items-center'>
                                <img className='bitcoin_img' src={bitcoin2} />
                                <span className='bit_text'>BIT</span>
                                <button className='bitcoin_text'>BITCOIN</button>
                            </div>
                            <div>
                                <button className='rounded-full text-lg p-2'> <MdArrowOutward /></button>
                            </div>
                        </div>
                        <div className='flex gap-2.5 justify-between items-center'>
                            <div className='flex w-40 flex-col gap-3'>
                                <span className='amount_text'>$56,623.54</span>
                                <span className='percentage_text'>1.41%</span>
                            </div>
                            <div>
                                <img className='chart_img' src={chart} />
                            </div>
                        </div>
                    </div>


                    <div className='market_trend_box'>
                        <div className='flex items-center border-b pb-4 border-[#ECF1F0] gap-16'>
                            <div className='flex gap-3 items-center'>
                                <img className='bitcoin_img' src={bitcoin3} />
                                <span className='bit_text'>BIT</span>
                                <button className='bitcoin_text'>BITCOIN</button>
                            </div>
                            <div>
                                <button className='rounded-full text-lg p-2'> <MdArrowOutward /></button>
                            </div>
                        </div>
                        <div className='flex gap-2.5 justify-between items-center'>
                            <div className='flex w-40 flex-col gap-3'>
                                <span className='amount_text'>$56,623.54</span>
                                <span className='percentage_text'>1.41%</span>
                            </div>
                            <div>
                                <img className='chart_img' src={chart} />
                            </div>
                        </div>
                    </div>


                    <div className='market_trend_box'>
                        <div className='flex items-center border-b pb-4 border-[#ECF1F0] gap-16'>
                            <div className='flex gap-3 items-center'>
                                <img className='bitcoin_img' src={bitcoin4} />
                                <span className='bit_text'>BIT</span>
                                <button className='bitcoin_text'>BITCOIN</button>
                            </div>
                            <div>
                                <button className='rounded-full text-lg p-2'> <MdArrowOutward /></button>
                            </div>
                        </div>
                        <div className='flex gap-2.5 justify-between items-center'>
                            <div className='flex w-40 flex-col gap-3'>
                                <span className='amount_text'>$56,623.54</span>
                                <span className='percentage_text'>1.41%</span>
                            </div>
                            <div>
                                <img className='chart_img' src={chart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <span className='crytocap_heading text-center flex pt-20 justify-center'>CryptoCap Amazing Faetures</span>
                <span className='crytocap_para text-center flex justify-center pt-4'>Explore sensational features to prepare your best investment in cryptocurrency</span>

                <div className='flex gap-10 px-20 pt-[70px]'>
                    <div className='cryptocap_box flex flex-col justify-start'>
                        <div className='flex justify-start'>
                            <img className='feature_img' src={featureImg1} />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='font-semibold text-xl'>Manage Portfolio</span>
                            <span>Buy and sell popular digital currencies, keep track of them in the one place.</span>
                        </div>

                        <div className='text-[#0FAE96] flex items-center pt-[38px] justify-start'>
                            <span>See Explained</span> <span><MdOutlineArrowRightAlt /></span>
                        </div>
                    </div>

                    <div className='cryptocap_box flex flex-col justify-start'>
                        <div className='flex justify-start'>
                            <img className='feature_img' src={featureImg2} />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='font-semibold text-xl'>Manage Portfolio</span>
                            <span>Buy and sell popular digital currencies, keep track of them in the one place.</span>
                        </div>

                        <div className='text-[#0FAE96] flex items-center pt-[38px] justify-start'>
                            <span>See Explained</span> <span><MdOutlineArrowRightAlt /></span>
                        </div>
                    </div>

                    <div className='cryptocap_box flex flex-col justify-start'>
                        <div className='flex justify-start'>
                            <img className='feature_img' src={featureImg3} />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='font-semibold text-xl'>Manage Portfolio</span>
                            <span>Buy and sell popular digital currencies, keep track of them in the one place.</span>
                        </div>

                        <div className='text-[#0FAE96] flex items-center pt-[38px] justify-start'>
                            <span>See Explained</span> <span><MdOutlineArrowRightAlt /></span>
                        </div>
                    </div>

                    <div className='cryptocap_box flex flex-col justify-start'>
                        <div className='flex justify-start'>
                            <img className='feature_img' src={featureImg4} />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <span className='font-semibold text-xl'>Manage Portfolio</span>
                            <span>Buy and sell popular digital currencies, keep track of them in the one place.</span>
                        </div>

                        <div className='text-[#0FAE96] pt-[38px]  flex items-center justify-start'>
                            <span>See Explained</span> <span><MdOutlineArrowRightAlt /></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-20'>
                <div className='crypto_currency_section'>
                    <div className='flex flex-col'>
                        <span className='text-2xl font-semibold'>New In Cryptocurrency?</span>
                        <span className='text-lg w-[550px] pt-4'>We'll tell you what cryptocurrencies are, how they work and why you should own one right now. So let's do it.</span>
                    </div>
                    <div>
                        <button className='home__btn'>Learn & Explore Now</button>
                    </div>
                </div>
            </div>

            <div className='px-20'>
                <span className='market_update_haeding block'>Market Update</span>
                <div className='py-[31px]'>
                    <span className='market_update_para pb-[31px] block'>Cryptocurrency Categories</span>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <button className='table_active_btn'>Popular</button>
                            <button className='table_non-active_btn'>Metaverse</button>
                            <button className='table_non-active_btn'>Entertainment</button>
                            <button className='table_non-active_btn'>Energy</button>
                            <button className='table_non-active_btn'>Gaming</button>
                            <button className='table_non-active_btn'>Music</button>
                        </div>
                        <div>
                            <div className="search__container flex items-center px-4">
                                <button
                                >
                                    <FiSearch />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search Coin..."
                                    className=""
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='tableList__container'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>NAME</th>
                                        <th>LAST PRICE</th>
                                        <th>CHANGE</th>
                                        <th>MARKET STATS</th>
                                        <th>TRADES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className='flex items-center gap-3 justify-center'>
                                                <img className='bitcoin2_img' src={bitcoin} /> Bit coin | BTC
                                            </div>
                                        </td>
                                        <td>$56,623.54</td>
                                        <td>1.41%</td>
                                        <td>
                                            <div className='flex justify-center'>
                                                <img className='chart_img' src={chart} />
                                            </div>
                                        </td>
                                        <td className='flex justify-center'>
                                            <button className='trade_btn'>Trade</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className='flex items-center gap-3 justify-center'>
                                                <img className='bitcoin2_img' src={bitcoin2} /> Bit coin | BTC
                                            </div>
                                        </td>
                                        <td>$56,623.54</td>
                                        <td>1.41%</td>
                                        <td>
                                            <div className='flex justify-center'>
                                                <img className='chart_img' src={chart} />
                                            </div>
                                        </td>
                                        <td className='flex justify-center'>
                                            <button className='trade_btn'>Trade</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className='flex items-center gap-3 justify-center'>
                                                <img className='bitcoin2_img' src={bitcoin3} /> Bit coin | BTC
                                            </div>
                                        </td>
                                        <td>$56,623.54</td>
                                        <td>1.41%</td>
                                        <td>
                                            <div className='flex justify-center'>
                                                <img className='chart_img' src={chart} />
                                            </div>
                                        </td>
                                        <td className='flex justify-center'>
                                            <button className='trade_btn'>Trade</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className='flex items-center gap-3 justify-center'>
                                                <img className='bitcoin2_img' src={bitcoin4} /> Bit coin | BTC
                                            </div>
                                        </td>
                                        <td>$56,623.54</td>
                                        <td>1.41%</td>
                                        <td>
                                            <div className='flex justify-center'>
                                                <img className='chart_img' src={chart} />
                                            </div>
                                        </td>
                                        <td className='flex justify-center'>
                                            <button className='trade_btn'>Trade</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className='flex items-center gap-3 justify-center'>
                                                <img className='bitcoin2_img' src={bitcoin} /> Bit coin | BTC
                                            </div>
                                        </td>
                                        <td>$56,623.54</td>
                                        <td>1.41%</td>
                                        <td>
                                            <div className='flex justify-center'>
                                                <img className='chart_img' src={chart} />
                                            </div>
                                        </td>
                                        <td className='flex justify-center'>
                                            <button className='trade_btn'>Trade</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex py-20 px-20'>
                <div className='w-1/2'>
                    <span className='start_heading block'>How To Get Started</span>
                    <span className='start_para block w-[400px] pt-5'>Simple and easy way to start your investment in cryptocurrency</span>
                    <div className='pt-10 block'>
                        <button className='start_btn text-center'><a href='https://cryptouat.crypto-edv.pages.dev/sign-up'>Get Started</a></button>
                    </div>
                </div>
                <div className='w-1/2 grid gap-x-5 gap-y-10'>
                    <div className='start_box'>
                        <div>
                            <img className='start_icon' src={start1} />
                        </div>
                        <div>
                            <span className='block start_box_head'>Create Your Account</span>
                            <span className='block start_box_text w-[300px]'>Your account and personal identity are guaranteed safe.</span>
                        </div>
                    </div>

                    <div className='start_box'>
                        <div>
                            <img className='start_icon' src={start2} />
                        </div>
                        <div>
                            <span className='block start_box_head'>Connect Bank Account</span>
                            <span className='block start_box_text w-[300px]'>Your account and personal identity are guaranteed safe.</span>
                        </div>
                    </div>

                    <div className='start_box'>
                        <div>
                            <img className='start_icon' src={start3} />
                        </div>
                        <div>
                            <span className='block start_box_head'>Start Build Portfolio</span>
                            <span className='block start_box_text w-[300px]'>Your account and personal identity are guaranteed safe.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <span className='learn_heading text-center block'>Learn About Cryptocurrency</span>
                <span className='learn_para text-center pt-5 pb-10 block'>Learn all about cryptocurrency to start investing</span>
            </div>

            <div className='grid grid-cols-4 pb-10 gap-6 px-20'>
                <div className='learn_box_1 col-span-2'>
                    <span className='learn_box_head'>All about Investing in NFTs and related risks</span>
                    <div className='flex justify-start'>
                        <span className='learn_boc_para block text-start'>CRYPTO BASIC</span>
                    </div>
                </div>

                <div className='learn_box_2'>
                    <div>
                        <img src={thumbnail} />
                    </div>
                    <span className='learn_boc_para m-2 block text-start'>CRYPTO BASIC</span>
                    <span className='block font-semibold m-2'>What is cryptocurrency? all you need to know</span>
                    <span className='text-sm m-2'>Cryptocurrencies are basically digital assets. It is secured by cryptography.. </span>
                </div>

                 <div className='learn_box_2'>
                    <div>
                        <img src={thumbnail2} />
                    </div>
                    <span className='learn_boc_para m-2 block text-start'>CRYPTO BASIC</span>
                    <span className='block font-semibold m-2'>What is cryptocurrency? all you need to know</span>
                    <span className='text-sm m-2'>Cryptocurrencies are basically digital assets. It is secured by cryptography.. </span>
                </div>

                 <div className='learn_box_2'>
                    <div>
                        <img src={thumbnail3} />
                    </div>
                    <span className='learn_boc_para m-2 block text-start'>CRYPTO BASIC</span>
                    <span className='block font-semibold m-2'>What is cryptocurrency? all you need to know</span>
                    <span className='text-sm m-2'>Cryptocurrencies are basically digital assets. It is secured by cryptography.. </span>
                </div>

                 <div className='learn_box_2'>
                    <div>
                        <img src={thumbnail4} />
                    </div>
                    <span className='learn_boc_para m-2 block text-start'>CRYPTO BASIC</span>
                    <span className='block font-semibold m-2'>What is cryptocurrency? all you need to know</span>
                    <span className='text-sm m-2'>Cryptocurrencies are basically digital assets. It is secured by cryptography.. </span>
                </div>

                 <div className='learn_box_2'>
                    <div>
                        <img src={thumbnail5} />
                    </div>
                    <span className='learn_boc_para m-2 block text-start'>CRYPTO BASIC</span>
                    <span className='block font-semibold m-2'>What is cryptocurrency? all you need to know</span>
                    <span className='text-sm m-2'>Cryptocurrencies are basically digital assets. It is secured by cryptography.. </span>
                </div>

                 <div className='learn_box_2'>
                    <div>
                        <img src={thumbnail6} />
                    </div>
                    <span className='learn_boc_para m-2 block text-start'>CRYPTO BASIC</span>
                    <span className='block font-semibold m-2'>What is cryptocurrency? all you need to know</span>
                    <span className='text-sm m-2'>Cryptocurrencies are basically digital assets. It is secured by cryptography.. </span>
                </div>
            </div>
        </div>
        <Footer /></>
    )
}

export default Home