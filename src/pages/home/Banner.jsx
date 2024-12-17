import React from 'react'
import bannerImg from '../../assets/banner.png'

const Banner = () => {
    return (
        <div className='flex  flex-col-reverse  md:flex-row items-center py-3 justify-between lg:py-4 gap-12 '>
            <div className='md:w-1/2 w-full flex flex-col gap-8 items-start'>
                <h1 className='md:text-5xl text-2xl font-medium text-secondary'>New Releases This Week</h1>
                <p className='font-secondary text-secondary'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
                <button className='btn-primary'>Subscribe</button>
            </div>
            <div className='md:w-1/2 w-full flex items-center md:justify-end'>
                <img src={bannerImg} alt="" />
            </div>
        </div>
    )
}

export default Banner