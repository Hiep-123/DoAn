import { createContext, useEffect, useState } from 'react';
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {

    const data = [
        { img: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_7-1-600x316.jpg', category: 'Electric', brandCar: 'Toyota Cayene', price: '42.00', des: 'Amet facilisi elit quam sollicitudin neque, imperdiet mauris.' },
        { img: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_4-1-600x316.jpg', category: 'Compact', brandCar: 'Mercedes A-Class', price: '64.00', des: 'Sapien at nunc viverra sed quam facilisis ultrices varius sit.' },
        { img: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_6-1-600x316.jpg', category: 'Racing', brandCar: 'Audi Speed A4', price: '33.00', des: 'Ullamcorper placerat tincidunt fringilla dignissim leo in et nisl, nullam.' },
        { img: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image_5-1-600x316.jpg', category: 'Convertible', brandCar: 'Aston Martin DB9', price: '24.00', des: 'Hendrerit vivamus justo maecenas senectus aliquam.' },

    ]

    // const [listCar, setListCar] = useState([])
    // setListCar(data)
    const value = {
        data,
        // listCar
    }
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}