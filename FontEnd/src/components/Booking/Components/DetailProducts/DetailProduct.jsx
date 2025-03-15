import React, { useContext } from 'react'
import Banner from '@components/Banner/Banner'
import Header from '@components/Header/Header'
import { StoreContext } from '@/context/StoreProvider';
import ShowInfoCar from './ShowInfoCar';
import MainLayout from '@components/Layout/Layout';
import Footer from '@components/Footer/Footer';

function DetailProduct() {
    return (
        <>
            <Header />
            <Banner />
            <MainLayout>
                <ShowInfoCar  />
            </MainLayout>
            <Footer />
        </>
    )
}

export default DetailProduct