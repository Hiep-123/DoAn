import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import { dataMenu } from './constants'
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch, CiUser } from "react-icons/ci";
import Button from '../Button/Button'
import { useNavigate } from "react-router";
import Menu from './Menu';
import { SideBarContext } from '@/context/sideBarProvider';

function Header() {

    const { container, containerHeader, containerBox, containerMenu,
        containerBoxIcon, menu, dropdown, dropdownItem
    } = styles;

    const [showDropdown, setShowDropdown] = useState(false);
    const { setIsOpen, isOpen, setType, userId, userInfo, handleLogOut } = useContext(SideBarContext);
    const navigate = useNavigate();

    const handleNavigateHome = () => navigate('/');
    const handleNavigateBooking = () => navigate('/shop');

    return (
        <div className={container}>
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon} onClick={handleNavigateHome}>
                        <IoHomeOutline size={'23px'} color={'rgb(31, 244, 215)'} />
                    </div>
                    <div className={containerMenu}>
                        {dataMenu.slice(0, 4).map((item, index) => (
                            <Menu content={item.content} key={index} setIsOpen={setIsOpen} />
                        ))}
                    </div>
                </div>
                <div onClick={handleNavigateHome} style={{ padding: '0 15px', cursor: 'pointer' }}>
                    <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Logo.png" alt="logo" />
                </div>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        <div className={menu}>
                            <CiSearch size={'20px'} />
                            Search
                        </div>

                        {/* Avatar user & Dropdown */}
                        <div className={menu}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                            onClick={() => {
                                if (!userId) {
                                    setIsOpen(!isOpen);
                                    setType('login');
                                }
                            }}
                            style={{
                                position: 'relative'
                            }} >
                            {!userId && <CiUser size={'25px'} />}
                            {userId ? `Xin chào, ${userInfo?.userName}` : 'Sign in'}

                            {/* Dropdown Logout */}
                            {showDropdown && userId && (
                                <div className={dropdown}>
                                    <div className={dropdownItem} onClick={handleLogOut}>
                                        Log out
                                    </div>
                                </div>
                            )}
                        </div>

                        <div onClick={handleNavigateBooking}>
                            <Button content={'Book Now'} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Header;
