import { createContext, useState } from 'react';

export const SideBarContext = createContext();

export const SideBarProvier = ({ children }) => {
    const [isOpen, setIsOpen] = useState();
    const [type, setType] = useState();
    const value = {
        setIsOpen, type, setType, isOpen
    };


    return (
        <SideBarContext.Provider value={value}>
            {children}
        </SideBarContext.Provider>
    );
};
