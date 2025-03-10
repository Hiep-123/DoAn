import React, { useContext } from 'react'
import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer';
import Banner from '@components/Banner/Banner'
import MainLayout from '@components/Layout/Layout';
import Filter from './Components/Filter';
import ListCar from './Components/ListCar';
import { StoreContext } from '@/context/StoreProvider';
import { BookingContext } from '@/context/BookingProvider';

function Booking() {
    const { listCar, isLoading } = useContext(StoreContext)
    const { dataListSortCar } = useContext(BookingContext)
    return (
        <div>
            <Header />
            <Banner />
            <MainLayout>
                <Filter />
                <ListCar data={dataListSortCar} isLoading={isLoading} />
            </MainLayout>
            <Footer />
        </div>
    )
}

export default Booking