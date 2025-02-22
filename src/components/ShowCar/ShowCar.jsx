import React from 'react'

import MainLayout from '@components/Layout/Layout'
import styles from './styles.module.scss'
import SliderCommon from '@components/SliderCommon/SliderCommon';

function ShowCar() {
    const { container, title, des, subDes } = styles
    

    return (
        <MainLayout>
            <div className={container}>
                <div className={title}>
                    Vehicle Models
                </div>
                <div className={des}>
                    Meet Awesome <span>Fleet</span>
                </div>
                <div className={subDes}>
                    From compact 3-door cars to spacious SUVs and vans, we have everything you need
                </div>
                <div>
                    <SliderCommon />
                </div>

            </div>
        </MainLayout>
    );

}

export default ShowCar