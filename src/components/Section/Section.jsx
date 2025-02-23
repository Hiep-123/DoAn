import React from 'react'
import styles from './styles.module.scss'
import MainLayout from '@components/Layout/Layout';
import { GiAchievement } from "react-icons/gi";
import { FaCar, FaHandHoldingHeart, FaFacebookF, FaInstagram, FaYoutube, FaTelegramPlane } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
function Section() {
    const { container, containerBox, title, headLine, subTitle, containerCard, Box1,  icon, boxIcon } = styles

    return (
        <MainLayout>
            <div className={container}>
                <div className={containerBox}>
                    
                    <div className={title} style={{ marginBottom: '10px' }}>
                        OUR DIFFERENT
                    </div>
                    <h2 className={headLine} style={{ marginBottom: '15px' }}>
                        WHY CHOOSE <span>US</span>
                    </h2>
                    <div className={subTitle}>
                        There are many variations of passage of lorem Ipsum availabile, but the majorit suffered.
                    </div>

                    <div className={boxIcon}>
                        <div className={icon}>
                            <FaFacebookF size={'18px'} color={'#888'} />
                        </div>
                        <div className={icon}>
                            <BsTwitterX size={'22px'} color={'#888'} />
                        </div>
                        <div className={icon}>
                            <FaInstagram size={'22px'} color={'#888'} />
                        </div>
                        <div className={icon}>
                            <FaYoutube size={'22px'} color={'#888'} />
                        </div>
                        <div className={icon}>
                            <FaTelegramPlane size={'22px'} color={'#888'} />
                        </div>
                    </div>
                </div>
                <div className={containerCard}>
                    <div className={Box1}>
                        <div style={{ marginBottom: '20px' }}>
                            <GiAchievement size={'75px'} color={'#3C43ED'} />
                        </div>
                        <span >
                            Variety of Car Brands
                        </span>
                        <p style={{ marginTop: '20px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboire dolore magnaed aliqua.
                        </p>
                    </div>
                    <div className={Box1}>
                        <div style={{ marginBottom: '20px' }}>
                            <FaCar size={'70px'} color={'#3C43ED'} />
                        </div>
                        <span>
                            Best Rate Guarantee
                        </span>
                        <p style={{ marginTop: '20px' }}>
                            But I must explains to your how all this mistaken idea of denouncing pleasure and praising pain was born will of then system
                        </p>
                    </div>
                    <div className={Box1}>
                        <div style={{ marginBottom: '20px' }}>
                            <FaHandHoldingHeart size={'70px'} color={'#3C43ED'} />
                        </div>
                        <span>
                            Awesome Customer Support
                        </span>
                        <p style={{ marginTop: '20px' }}>
                            It is long established fact that reader will be distracte by the readable content of an page when liooking at its out characteristic.
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Section