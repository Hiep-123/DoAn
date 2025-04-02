import React, { useContext, useEffect, useState } from "react";
import Header from "@components/Header/Header";
import Banner from "@components/Banner/Banner";
import { useLocation } from "react-router-dom";
import { getBookingId } from "@/apis/bookingService";
import InputCommon from "@components/InputCommon/InputCommon";
import styles from "../styles.module.scss";
import MainLayout from "@components/Layout/Layout";
import Footer from "@components/Footer/Footer";
import classNames from "classnames";
import { SideBarContext } from "@/context/SideBarProvider";
import { addPayment } from "../../../apis/paymentService";
import { ToastContext } from "@/context/ToastProvider";
import { BookingContext } from "@/context/BookingProvider";

function Checkout() {
    const {
        containerForm, box1, box2, containerBox2, boxInfo,
        boxInfo1, boxInfo2, cashPayment, isVisibility,
        contentMenu, button, saleBooster, subtitle
    } = styles;

    const location = useLocation();
    const bookingId = location.state?.bookingId;
    const numberCar = location.state?.numberCar;

    const [selectedPayment, setSelectedPayment] = useState(null);
    const { setDataBooking, dataBooking } = useContext(BookingContext)
    const { userId, userInfo } = useContext(SideBarContext)
    const { toast } = useContext(ToastContext);
    console.log(userInfo)
    const pickupDate = dataBooking?.pickupDate ? new Date(dataBooking.pickupDate) : null;
    const dropOffDate = dataBooking?.dropOffDate ? new Date(dataBooking.dropOffDate) : null;
    const rentalDays = pickupDate && dropOffDate
        ? Math.max(1, Math.ceil((dropOffDate - pickupDate) / (1000 * 60 * 60 * 24)))
        : 0;
    const pricePerDay = dataBooking?.carId?.pricePerDay || 0;
    const totalPrice = rentalDays * pricePerDay * numberCar;

    const handleGetInfoBooking = async () => {
        try {
            const res = await getBookingId(bookingId);
            setDataBooking(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    const handlePayment = async () => {

        const data = {
            userId,
            bookingId,
            method: selectedPayment,  // Người dùng chọn phương thức thanh toán
            amountCar: Number(numberCar),    // Số lượng xe thuê
            totalAmount: totalPrice  // Tổng tiền
        };

        try {
            await addPayment(data).then((res) => {
                toast.success('You have paid successfully.')
            })
        } catch (error) {
            toast.error("Payment failed. Please try again.");
        }
    };


    useEffect(() => {
        if (bookingId) {
            handleGetInfoBooking();
        }
    }, [bookingId]);

    return (
        <>
            <Header />
            <Banner />
            <MainLayout>
                <span>BILLING DETAILS</span>
                <div className={containerForm}>
                    <div className={box1}>

                        <InputCommon label="Full Name"
                            required
                            value={dataBooking?.userId?.name || ""} readOnly />

                        <InputCommon label="Email"
                            required
                            value={dataBooking?.userId?.email || dataBooking?.userId?.userName || ""} readOnly />

                        <InputCommon label="Phone Number"
                            required
                            value={dataBooking?.userId?.phone || ""} readOnly />

                        <InputCommon label="Car Name"
                            required
                            value={dataBooking?.carId?.category || ""} readOnly />

                        <InputCommon label="Amount Car" required
                            value={numberCar}
                            readOnly
                        />
                        <InputCommon label="Pickup Date" required
                            value={pickupDate ? pickupDate.toLocaleDateString("vi-VN") : ""}
                            readOnly
                        />
                        <InputCommon label="Drop Off Date" required
                            value={dropOffDate ? dropOffDate.toLocaleDateString("vi-VN") : ""}
                            readOnly
                        />
                        <InputCommon label="Rental Days"
                            required
                            value={`${rentalDays} days`} readOnly />

                        <InputCommon label="Total Price"
                            required
                            value={`${totalPrice.toLocaleString("vi-VN")}.00 $`} readOnly />
                    </div>

                    <div className={box2}>
                        <div className={containerBox2}>
                            <div className={boxInfo}>
                                <span>YOUR BOOKING</span>
                                <div className={boxInfo1}>
                                    <img src={dataBooking?.carId?.img} alt="Car" />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span style={{ color: "rgb(98, 98, 98)", margin: "10px" }}>
                                            Car Name: {dataBooking?.carId?.category}
                                        </span>
                                        <span style={{ color: "rgb(98, 98, 98)", margin: "10px" }}>
                                            Price Per Day: {pricePerDay}.00 $
                                        </span>
                                        <span style={{ color: "rgb(98, 98, 98)", margin: "10px" }}>
                                            Des: {dataBooking?.carId?.des}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={boxInfo2}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", color: "rgb(98, 98, 98)" }}>
                                    <div>Subtotal</div>
                                    <div>{totalPrice}.00 $</div>
                                </div>
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "30px", color: "rgb(3, 3, 3)", paddingBottom: "20px" }}>
                                        <div>TOTAL: </div>
                                        <div>{totalPrice}.00 $</div>
                                    </div>
                                </div>
                            </div>

                            {/* Cash Payment */}
                            <div className={cashPayment}>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={selectedPayment === "cash"}
                                        onChange={() => setSelectedPayment("cash")}
                                        style={{ width: "15px", height: "15px" }}
                                    />
                                    <span style={{ margin: "0" }}>Cash payment</span>
                                </div>
                                {selectedPayment === "cash" && (
                                    <div className={classNames(contentMenu, isVisibility)}>
                                        <div>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</div>
                                    </div>
                                )}
                            </div>

                            {/* Payment by Transfer */}
                            <div className={cashPayment}>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="transfer"
                                        checked={selectedPayment === "transfer"}
                                        onChange={() => setSelectedPayment("transfer")}
                                        style={{ width: "15px", height: "15px" }}
                                    />
                                    <span style={{ margin: "0" }}>Payment by transfer</span>
                                </div>
                                {selectedPayment === "transfer" && (
                                    <div className={classNames(contentMenu, isVisibility)}>
                                        <div>You can transfer money in many ways.</div>
                                    </div>
                                )}
                            </div>

                            <button className={button}
                                onClick={handlePayment}>Payment</button>

                            <div className={saleBooster}>
                                <fieldset>
                                    <legend>Guaranteed <span style={{
                                        color: '#2e7d32',
                                        margin: '0 5px'
                                    }}>safe</span> checkout</legend>
                                    <span >
                                        <img src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/visa.jpeg" data-src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/visa.jpeg" alt="Pay safely with Visa" width="75px" height="45px" />
                                    </span>
                                    <span >
                                        <img src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/master-card.jpeg" data-src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/master-card.jpeg" alt="Pay safely with Master Card" width="75px" height="45px" />
                                    </span>
                                    <span >
                                        <img src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/paypal.jpeg" data-src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/paypal.jpeg" alt="Pay safely with PayPal" width="75px" height="45px" />
                                    </span>
                                    <span >
                                        <img src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/american-express.jpeg" data-src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/american-express.jpeg" alt="Pay safely with American Express" width="75px" height="45px" />
                                    </span>
                                    <span >
                                        <img src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/maestro.jpeg" data-src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/maestro.jpeg" alt="Pay safely with Maestro" width="75px" height="45px" />
                                    </span>
                                    <span >
                                        <img src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/bitcoin.jpeg" data-src="https://xstore.8theme.com/elementor2/marseille04/wp-content/themes/xstore/images/woocommerce/payment-icons/bitcoin.jpeg" alt="Pay safely with Bitcoin" width="75px" height="45px" />
                                    </span>
                                </fieldset>
                                <span className={subtitle}>Your Payment is <span>100% Secure</span></span>
                            </div>
                        </div>
                    </div>

                </div>
            </MainLayout>
            <Footer />
        </>
    );
}

export default Checkout;
