import React from 'react'
import styles from './styles.module.scss'
import Button from '@components/Button/Button'
import ShowInfoOffer from './ShowInfoOffer/ShowInfoOffer';
function AdvanceHeadling() {
    const { container, containerImg, containerOffer, title, info, button, boxShow } = styles;
    const data = [
        { src: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon_1-min.jpeg', title: 'No Counter Queues' },
        { src: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon_2-min.jpeg', title: 'From 1 To 90 Days' },
        { src: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon_3-min.jpeg', title: 'Free Cancellation' },
        { src: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon_4-min.jpeg', title: '24/7 Customer Service' },
        { src: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon1-min.jpeg', title: 'Professionally Managed' },
        { src: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon2-min.jpeg', title: '24/7 Access To Stations' },
        { src: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon3-min.jpeg', title: 'Guaranteed Model' },
        { src: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon4-min.jpeg', title: 'Pick Up Or Delivery' },

    ]
    return (
        <div className={container}>
            <div className={containerImg}>
                <img src="https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Group-7-min.jpeg" alt="lolo"
                    width={1125} height={700} />
            </div>
            <div className={containerOffer}>
                <div className={title}>What we offer</div>
                <div className={info}>Car Rental, How It Should <span style={{ color: '#2962ff' }}>Be</span></div>
                <div className={boxShow}>
                    <ShowInfoOffer data={data.slice(0, 4)} />
                    <ShowInfoOffer data={data.slice(4, data.length)} />
                </div>
                <div className={button}>
                    <Button content={'View Service'} isPrimary={true} />
                </div>
            </div>

        </div>
    )
}

export default AdvanceHeadling