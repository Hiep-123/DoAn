import styles from './styles.module.scss'
import ReviewForm from './ReviewForm';
import Button from '@components/Button/Button'
import { useLocation } from "react-router-dom";
function ShowInfoCar() {
    const { container, containerBoxLeft, boxLeft, category, brandCar, price,
        boxIcon, icon, boxRight, containerForm, boxInput
    } = styles
    const location = useLocation();
    const car = location.state;
    return (
        <div className={container} >
            <img src={car.data?.img} alt="" />
            <div className={containerBoxLeft}>
                <div className={boxLeft}>
                    <span className={category}>Category: <span style={{
                        color: 'blue'
                    }}>{car.data?.brandId.nameBrandCar}</span></span>

                    <h1 className={brandCar}>{car.data?.category}</h1>

                    <div className={price}>
                        $ {car.data.pricePerDay}.00
                    </div>

                    <div style={{
                        fontSize: '20px'
                    }}>{"⭐".repeat(5)}</div>

                    <div className={boxIcon}>
                        <div className={icon}>
                            <div>
                                <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon-min-1.jpeg" alt=""
                                    width={50} height={20} />
                                <div>
                                    4 Passengers
                                </div>
                            </div>
                        </div>

                        <div className={icon}>
                            <div>
                                <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon2-min-1.jpeg" alt=""
                                    width={15} height={20} />
                                <div>
                                    Auto Gear
                                </div>
                            </div>
                        </div>

                        <div className={icon}>
                            <div>
                                <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon3-min-1.jpeg" alt="" />
                                <div>
                                    6 Luggages
                                </div>
                            </div>
                        </div>

                        <div className={icon}>
                            <div>
                                <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Icon4-min-1.jpeg" alt="" />
                                <div>
                                    4 Doors
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <ReviewForm />
                    </div>
                </div>

                <div className={boxRight}>
                    <div className={containerForm}>
                        <div className={boxInput}>
                            <span>Full Name</span>
                            <input type="text" />
                        </div>
                        <div className={boxInput}>
                            <span>Phone Number</span>
                            <input type="text" />
                        </div>
                        <div className={boxInput}>
                            <span>Your Email</span>
                            <input type="text" />
                        </div>
                        <div className={boxInput}>
                            <span>Pickup Address</span>
                            <input type="text" />
                        </div>
                        <div className={boxInput}>
                            <span>Pickup Date</span>
                            <input type="date" />
                        </div>
                        <div className={boxInput}>
                            <span>Pickup Time</span>
                            <input type="text" />
                        </div>
                        <div className={boxInput}>
                            <span>Drop Off Address</span>
                            <input type="text" />
                        </div>
                        <div className={boxInput}>
                            <span>Drop Off Date</span>
                            <input type="date" />
                        </div>
                        <div className={boxInput}>
                            <span>Drop Off Time</span>
                            <input type="text" />
                        </div>
                        <Button content={'Request For Booking'} isPrimary={true} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShowInfoCar