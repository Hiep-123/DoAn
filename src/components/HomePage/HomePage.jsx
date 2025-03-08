import React, { useState } from 'react'
import Header from '@components/Header/Header'
import Banner from '@components/Banner/Banner'
import styles from './styles.module.scss'
import Section from '@components/Section/Section';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
import ShowCar from '@components/ShowCar/ShowCar';
import SectionRentalCar from '@components/SectionRentalCar/SectionRentalCar';
import SectionDiscounts from '@components/SectionDiscounts/SectionDiscounts';
import Populate from '@components/Populate/Populate';
import SectionMap from '@components/SectionMap/SectionMap';
import ArticleList from '@components/ArticleCard/ArticleList';
import Footer from '@components/Footer/Footer';

function HomePage() {
    const { container } = styles;
    return (
        <div className={container}>
                <Header />
                <Banner />
                <Section />
                <AdvanceHeadling />
                <ShowCar />
                <SectionRentalCar />
                <SectionDiscounts />
                <Populate />
                <SectionMap />
                <ArticleList />
                <Footer />
        </div>
    )
}

export default HomePage