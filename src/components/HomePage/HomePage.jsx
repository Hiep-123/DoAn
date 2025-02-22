import React from 'react'
import Header from '@components/Header/Header'
import Banner from '@components/Banner/Banner'
import styles from './styles.module.scss'
import Section from '@components/Section/Section';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
import ShowCar from '@components/ShowCar/ShowCar';
import { StoreProvider } from '@/context/StoreProvider';
function HomePage() {
    const { container } = styles;
    return (
        <div className={container}>
            <StoreProvider>
                <Header />
                <Banner />
                <Section />
                <AdvanceHeadling />
                <ShowCar />
            </StoreProvider>

        </div>
    )
}

export default HomePage