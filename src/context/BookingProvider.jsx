import { createContext, useState } from 'react';
export const BookingContext = createContext();
export const BookingProvider = ({ children }) => {
    const sortOptions = [
        { label: 'Default sorting', value: '0' },
        { label: 'Sort by popularity', value: '1' },
        { label: 'Sort by average rating', value: '2' },
        { label: 'Sort by latest', value: '3' },
        { label: 'Sort by price: low to high', value: '4' },
        { label: 'Sort by price: high to low', value: '5' }
    ];

    const showOptions = [
        { label: '8', value: '8' },
        { label: '12', value: '12' },
        { label: 'All', value: 'all' }
    ];

    const dataListCar = [
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
        { img: 'https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },
    ]


    const [sortId, setSortId] = useState('0');
    const [showId, setShowId] = useState('8');
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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
        dataListCar
    }
    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    )
}

