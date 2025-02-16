import React from 'react'
<<<<<<< HEAD
import Header from '../Header/Header'
import Banner from '../Banner/Banner'
import styles from './styles.module.scss'
=======
import Header from '@components/Header/Header'
import Banner from '@components/Banner/Banner'
import styles from './styles.module.scss'
import Section from '@components/Section/Section';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
>>>>>>> 8d49d79 (update code section advanceHeadling)
function HomePage() {
    const { container } = styles;
    return (
        <div className={container}>
            <Header />
            <Banner />
<<<<<<< HEAD
=======
            <Section />
            <AdvanceHeadling/>
>>>>>>> 8d49d79 (update code section advanceHeadling)
        </div>
    )
}

export default HomePage