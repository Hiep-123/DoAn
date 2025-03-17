import { createContext, useEffect, useState } from 'react';
import { getCar } from '../apis/carService';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const sortOptions = [
        { label: 'Default sorting', value: '0' },
        { label: 'Sort by price: low to high', value: '1' },
        { label: 'Sort by price: high to low', value: '2' }
    ];

    const showOptions = [
        { label: '8', value: '8' },
        { label: '12', value: '12' },
        { label: 'All', value: 'all' }
    ];

    // 🟢 State quản lý dữ liệu và trạng thái
    const [sortId, setSortId] = useState('0');          // Mặc định là '0' (Default sorting)
    const [showId, setShowId] = useState('8');
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [dataListSortCar, setDataListSortCar] = useState([]);
    const [dataBooking, setDataBooking] = useState("");

    // 🟢 Hàm gọi API lấy dữ liệu xe
    const handleLoadCar = async () => {
        setIsLoading(true);
        const query = {
            sortId,
            showId
        }
        try {
            const res = await getCar(query);
            setDataListSortCar(res || []);
        } catch (err) {
            console.error("🔥 Lỗi khi gọi API:", err.response?.data || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleLoadCar();
    }, [sortId, showId]);  // Theo dõi sortId

    const value = {
        sortOptions,
        showOptions,
        setSortId,
        setShowId,
        setIsShowGrid,
        isShowGrid,
        isLoading,
        sortId,
        showId,
        handleLoadCar,
        dataListSortCar,
        dataBooking,
        setDataBooking
    };


    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};
