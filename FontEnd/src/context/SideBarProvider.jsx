import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getUserId } from '@/apis/authorService';

export const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState(null);
    const [userId, setUserId] = useState(Cookies.get('userId'));
    const [userInfo, setUserInfo] = useState(null);

    const handleLogOut = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');

        console.log("Cookies sau khi xóa:", Cookies.get()); // Kiểm tra cookies sau khi xóa

        setUserId(null);
        setUserInfo(null);
        window.location.reload();
    };

    const value = {
        setIsOpen,
        type,
        setType,
        isOpen,
        userId,
        setUserId,
        setUserInfo,
        userInfo,
        handleLogOut
    };


    useEffect(() => {
        if (userId) {
            getUserId(userId).then((res) => {
                setUserInfo(res.data);
            }).catch((err) => {
                console.error("Lỗi lấy thông tin user:", err);
            });
        }

    }, [userId]);


    return (
        <SideBarContext.Provider value={value}>
            {children}
        </SideBarContext.Provider>
    );
};
