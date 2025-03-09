import React from 'react'
import styles from './styles.module.scss'
import Button from '@components/Button/Button'
import MainLayout from '@components/Layout/Layout'

function SectionRentalCar() {
    const { container, containerBoxLeft, containerBoxRight, title, boxIcon, icon } = styles
    return (
        <MainLayout>
            <div className={container}>
                <div className={containerBoxLeft}>
                    <span >SINCE 1994</span>
                    <div className={title}>
                        We Are The Largest <span style={{
                            color: '#3C43ED',
                            fontSize: '40px'
                        }}>Car Rental Center</span>
                    </div>
                    <p>
                        There are many variations of passages of lorems Ipsum with available, but the majority have suffered alterations in some form by injected humours, or randomised words which don’t look even slightly believable.
                    </p>
                    <div className={boxIcon}>
                        <div className={icon}>
                            <div>
                                <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon-3.svg" alt="" />
                                <span>25+</span>
                            </div>
                            <p>Years of Experiences</p>
                        </div>
                        <div className={icon}>
                            <div>
                                <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Vector.svg" alt="" />
                                <span>80+</span>
                            </div>
                            <p style={{ paddingTop: '22px'}}>Car Ready for Rent</p>
                        </div>
                        <div className={icon}>
                            <div>
                                <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon-1-1.svg" alt="" />
                                <span>14+</span>
                            </div>
                            <p style={{ paddingTop: '10px' }}>Business Awards</p>
                        </div>
                    </div>

                    <Button content={'More About Us'} />
                </div>
                <div className={containerBoxRight}>
                    <img src="https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/new-Image-min.jpeg" alt=""
                        width={1000} height={625} />
                </div>
            </div>
        </MainLayout>
    )
}

export default SectionRentalCar