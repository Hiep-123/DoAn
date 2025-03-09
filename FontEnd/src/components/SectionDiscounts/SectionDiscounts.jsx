import React from 'react'
import styles from './styles.module.scss'
import Button from '@components/Button/Button'

function SectionDiscounts() {
    const { container, containerBox, containerBox1, containerBox2, title, des, premium,
        containerBox3, box
    } = styles
    return (
        <div className={container}>
            <div className={containerBox}>
                <div className={containerBox1}>

                    <p className={title}>
                        45% Discounts & Special Offers
                    </p>

                    <span className={des}>
                        Rent a Car for 7 Days and get 2 days extra absolutely <span>FREE</span>
                    </span>

                </div>

                <div className={containerBox2}>

                    <p className={premium}>
                        Try Premium Service
                    </p>

                    <div>
                        <Button content={'Get Car Now'} />
                    </div>
                </div>
            </div>

            <div className={containerBox3}>
                <div className={box}>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: '500'
                    }}>
                        Vehicles Stock
                    </span>
                    <p style={{
                        fontSize: '36px',
                        fontWeight: '600'
                    }}>
                        3,500
                    </p>
                </div>

                <div className={box}>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: '500'
                    }}>
                        Dealers Served
                    </span>
                    <p style={{
                        fontSize: '36px',
                        fontWeight: '600'
                    }}>
                        128K +
                    </p>
                </div>
                <div className={box}>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: '500'
                    }}>
                        Happy Customer
                    </span>
                    <p style={{
                        fontSize: '36px',
                        fontWeight: '600'
                    }}>
                        10M +
                    </p>
                </div>
                <div className={box}>
                    <span style={{
                        fontSize: '20px',
                        fontWeight: '500'
                    }}>
                        Rental Points
                    </span>
                    <p style={{
                        fontSize: '36px',
                        fontWeight: '600'
                    }}>
                        2,550
                    </p>
                </div>
            </div>
        </div>

    )
}

export default SectionDiscounts