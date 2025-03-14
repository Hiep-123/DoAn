import { createContext, useState } from 'react';

export const SideBarContext = createContext();

export const SideBarProvier = ({ children }) => {
    const [isOpen, setIsOpen] = useState();
    const [type, setType] = useState();
    const [userId, setUserId] = useState();
    const [userInfo, setUserInfo] = useState();
    console.log(userInfo)
    const value = {
        setIsOpen,
        type,
        setType,
        isOpen,
        userId,
        setUserId,
        setUserInfo,
        userInfo
    };



    return (
        <SideBarContext.Provider value={value}>
            {children}
        </SideBarContext.Provider>
    );
};
