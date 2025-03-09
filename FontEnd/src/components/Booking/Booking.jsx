import React, { useContext } from 'react'
import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer';
import Banner from '@components/Banner/Banner'
import MainLayout from '@components/Layout/Layout';
import Filter from './Components/Filter';
import ListCar from './Components/listCar';
import { BookingContext } from '@/context/BookingProvider';

function Booking() {
    const { dataListCar } = useContext(BookingContext)
    return (
        <div>
            <Header />
            <Banner />
            <MainLayout>
                <Filter />
                <ListCar data={dataListCar} />
            </MainLayout>
            <Footer />
        </div>
    )
}

export default Booking