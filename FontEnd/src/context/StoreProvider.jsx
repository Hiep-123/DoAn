import { createContext, useEffect, useState } from 'react';
import { getAllCar } from '../apis/carService';
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [listCar, setListCar] = useState([])

    const handleGetAllCar = async () => {
        setIsLoading(true)
        getAllCar().then((response) => {
            setListCar(response.data);
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })

    }

    const value = {
        listCar,
        isLoading,
        setIsLoading
    }

    useEffect(() => {
        handleGetAllCar()
    }, [])

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}