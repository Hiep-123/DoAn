import styles from './styles.module.scss'
import ReviewForm from './ReviewForm';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { SideBarContext } from "@/context/sideBarProvider";
import { ToastContext } from "@/context/ToastProvider";
import { addBooking } from '@/apis/bookingService';
import InputCommon from '@components/InputCommon/InputCommon';

function ShowInfoCar() {
    const { container, containerBoxLeft, boxLeft, category, brandCar, price,
        boxIcon, icon, boxRight, containerForm, boxInput, button
    } = styles

    const { ProductName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const car = location.state;
    const { userId, setIsOpen } = useContext(SideBarContext)
    const { toast } = useContext(ToastContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pickupAddress, setPickupAddress] = useState('')
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('')
    const [dropOffAddress, setDropOffAddress] = useState('')
    const [dropOffDate, setDropOffDate] = useState('');
    const [dropOffTime, setDropOffTime] = useState('');
    const [numberCar, setNumberCar] = useState('');
    const [isBookingSuccess, setIsBookingSuccess] = useState(false);
    const [bookingId, setBookingId] = useState('')
    const isValidGmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^(0[1-9][0-9]{8})$/;
        return phoneRegex.test(phone);
    };

    const handleAddBooking = async () => {
        if (!userId) {
            toast.warn("You must Sign In");
            setIsOpen(true);
            return;
        }

        if (!name || !pickupAddress || !pickupDate || !pickupTime || !dropOffAddress || !dropOffDate || !dropOffTime) {
            toast.error("Please fill in all required fields.");
            return;
        }
        if (!isValidGmail(email)) {
            toast.error("Invalid email, must be Gmail!");
            return;
        }
        if (!isValidPhone(phone)) {
            toast.error("Invalid phone number, must be 10 digits and start with 0");
            return;
        }

        const data = {
            userId,
            carId: car.data._id,
            pickupAddress,
            pickupDate,
            pickupTime,
            dropOffAddress,
            dropOffDate,
            dropOffTime,
            name,
            email,
            phone
        };

        try {
            const res = await addBooking(data);
            console.log("API Response:", res);

            if (res?.booking?._id) {  // Kiểm tra chắc chắn API có trả về booking._id
                setBookingId(res.booking._id);
                toast.success("You have successfully rented a car!");
                setIsBookingSuccess(true);
            } else {
                toast.error("Booking failed. Please try again.");
            }
        } catch (err) {
            console.error("Booking Error:", err);
            toast.error("Booking failed. Please try again.");
        }
    };



    useEffect(() => {
        if (isBookingSuccess) {
            navigate(`/shop/${ProductName}/checkout`, { state: { bookingId, numberCar } });

            // Reset form sau khi navigate
            setTimeout(() => {
                setDropOffAddress('');
                setDropOffDate('');
                setDropOffTime('');
                setPickupAddress('');
                setPickupDate('');
                setPickupTime('');
                setName('');
                setEmail('');
                setPhone('');
                setNumberCar('');
            }, 500); // Delay 500ms để đảm bảo dữ liệu đã được navigate
        }
    }, [isBookingSuccess, navigate, bookingId, numberCar]);


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
                        <InputCommon value={name} label={'Full Name'}
                            required
                            placeholder={'Nguyen Van A'}
                            onChange={(e) => setName(e.target.value)} />

                        <InputCommon value={phone} label={'Phone Number'}
                            required
                            placeholder={'0123456789'}
                            onChange={(e) => setPhone(e.target.value)} />

                        <InputCommon value={email} label={'Email'} required
                            placeholder={'abc@gmail.com'}
                            onChange={(e) => setEmail(e.target.value)} />

                        <InputCommon value={numberCar}
                            label={'Number of vehicles'}
                            required
                            placeholder={'1'}
                            onChange={(e) => setNumberCar(e.target.value)} />

                        <InputCommon value={pickupAddress} label={'Pickup Address'}
                            required
                            placeholder={"TP HCM"}
                            onChange={(e) => setPickupAddress(e.target.value)} />

                        <InputCommon type={'date'} value={pickupDate} label={'Pickup Date'}
                            required
                            placeholder={'05/22/2025'}
                            onChange={(e) => setPickupDate(e.target.value)} />

                        <InputCommon value={pickupTime} label={'Pickup Time'}
                            required
                            placeholder={'9h'}
                            onChange={(e) => setPickupTime(e.target.value)} />

                        <InputCommon value={dropOffAddress} label={'Drop Off Address'}
                            required
                            placeholder={'TP HCM'}
                            onChange={(e) => setDropOffAddress(e.target.value)} />

                        <InputCommon type={"date"} value={dropOffDate}
                            label={'Drop Off Date'}
                            required
                            placeholder={'25/05/2025'}
                            onChange={(e) => setDropOffDate(e.target.value)} />

                        <InputCommon value={dropOffTime}
                            label={'Drop Off Time'}
                            required
                            placeholder={'10h'}
                            onChange={(e) => setDropOffTime(e.target.value)} />

                        <button className={button}
                            onClick={handleAddBooking}>
                            Request For Booking
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShowInfoCar