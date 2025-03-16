import React, { useEffect, useState } from 'react'
import Header from '@components/Header/Header'
import Banner from '@components/Banner/Banner'
import { useLocation } from "react-router-dom";
import { getBookingId } from '@/apis/bookingService';
import InputCommon from '@components/InputCommon/InputCommon';
import styles from '../styles.module.scss'
import MainLayout from '@components/Layout/Layout'
import Footer from '@components/Footer/Footer'
function Checkout() {

    const { containerForm, box1, box2, containerBox2, boxInfo, boxInfo1, boxInfo2, cashPayment } = styles

    const location = useLocation();
    const bookingId = location.state;
    const [isCheck, setIsCheck] = useState(false)
    const [dataBooking, setDataBooking] = useState('')
    const pickupDate = dataBooking?.pickupDate ? new Date(dataBooking.pickupDate) : null;
    const dropOffDate = dataBooking?.dropOffDate ? new Date(dataBooking.dropOffDate) : null;
    const rentalDays = pickupDate && dropOffDate
        ? Math.max(1, Math.ceil((dropOffDate - pickupDate) / (1000 * 60 * 60 * 24)))
        : 0;
    const pricePerDay = dataBooking?.carId?.pricePerDay || 0;
    const totalPrice = rentalDays * pricePerDay;


    const handleGetInfoBooking = async () => {
        await getBookingId(bookingId).then((res) => {
            setDataBooking(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        handleGetInfoBooking()
    }, [bookingId])
    return (
        <>
            <Header />
            <Banner />
            <MainLayout>
                <span>BILLING DETAILS</span>
                <div className={containerForm}>
                    <div className={box1}>
                        <InputCommon label={'Full Name'} required
                            value={dataBooking?.userId?.name} />
                        <InputCommon label={'Email'} required
                            value={dataBooking?.userId?.email} />
                        <InputCommon label={'Phone Number'} required
                            value={dataBooking?.userId?.phone} />
                        <InputCommon label={'Car Name'} required
                            value={dataBooking?.carId?.category} />
                        <InputCommon label={'Price Per Day'} required
                            value={`${dataBooking?.carId?.pricePerDay}.00 $`} />
                        <InputCommon label={'Pickup Date'} required
                            value={dataBooking?.pickupDate
                                ? new Date(dataBooking.pickupDate).toLocaleDateString('vi-VN')
                                : ''} />
                        <InputCommon label={'Drop Off Date'} required
                            value={dataBooking?.dropOffDate
                                ? new Date(dataBooking.dropOffDate).toLocaleDateString('vi-VN')
                                : ''} />
                        <InputCommon label={'Rental Days'} required value={`${rentalDays} days`} />
                        <InputCommon label={'Total Price'} required value={`${totalPrice.toLocaleString('vi-VN')}.00 $`} />
                    </div>

                    <div className={box2}>
                        <div className={containerBox2}>
                            <div className={boxInfo}>
                                <span>YOUR BOOKING</span>
                                <div className={boxInfo1}>
                                    <img src={dataBooking?.carId?.img} alt="" />
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        <span style={{
                                            color: 'rgb(98, 98, 98)',
                                            margin: '10px'
                                        }}>Car Name: {dataBooking?.carId?.category}</span>
                                        <span style={{
                                            color: 'rgb(98, 98, 98)',
                                            margin: '10px'
                                        }}>Price Per Day: {dataBooking?.carId?.pricePerDay}.00 $</span>
                                        <span style={{
                                            color: 'rgb(98, 98, 98)',
                                            margin: '10px'
                                        }}>Des: {dataBooking?.carId?.des}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={boxInfo2}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '20px',
                                    color: 'rgb(98, 98, 98)'
                                }}>
                                    <div>
                                        Subtotal
                                    </div>

                                    <div>
                                        {totalPrice}.00 $
                                    </div>
                                </div>

                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '30px',
                                        color: 'rgb(3, 3, 3)'
                                    }}>
                                        <div>TOTAL: </div>
                                        <div> {totalPrice}.00 $</div>
                                    </div>
                                </div>


                            </div>

                            <div className={cashPayment}>
                                <div style={{
                                    display: "flex",
                                    gap: '10px'
                                }}>
                                    <input type="radio"
                                        onClick={() => setIsCheck(!isCheck)}
                                        style={{
                                            width: '15px',
                                            height: '15px',
                                            margintop: '9px'
                                        }} />
                                    <span style={{
                                        margin: '0'
                                    }}>Cash payment</span>
                                </div>
                                <div>
                                    <div>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </MainLayout>

            <Footer />

        </>
    );
}

export default Checkout