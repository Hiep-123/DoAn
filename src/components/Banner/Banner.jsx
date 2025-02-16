import React from 'react'
import styles from './styles.module.scss'
function Banner() {
    const { container, containerBanner, text1, text2, text3 } = styles;
    return (
        <div className={container}>
            <div className={containerBanner}>
                <h2 className={text1}>Welcome to our store</h2>
                <h2 className={text2}>
                    #1 Car Rent Service In Your City.
                </h2>
                <div className={text3}>
                    Book a Car to your destination in town choose from a range of categories and prices.
                    The best way to travel to your destination
                </div>
            </div>
        </div>
    )
}

export default Banner