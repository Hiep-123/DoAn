import React from 'react'
import Header from '@components/Header/Header'
import Banner from '@components/Banner/Banner'
import styles from './styles.module.scss'
import Section from '@components/Section/Section';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
function HomePage() {
    const { container } = styles;
    return (
        <div className={container}>
            <Header />
            <Banner />
            <Section />
            <AdvanceHeadling />
        </div>
    )
}

export default HomePage