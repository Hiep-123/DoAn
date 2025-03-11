import React from 'react'
import styles from './styles.module.scss'
import { dataMenu } from './constants'
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import Button from '../Button/Button'
import { useNavigate } from "react-router";
import Menu from './Menu';
function Header() {
    const { container, containerHeader, containerBox, containerMenu,
        containerBoxIcon, menu
    } = styles;
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/')
    }
    const handleNavigateBooking = () => {
        navigate('/shop')
    }
    return (
        <div className={container}>
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        <div style={{ marginRight: '10px' }} onClick={handleNavigateHome}>
                            <IoHomeOutline size={'23px'} color={'rgb(31, 244, 215)'} />
                        </div>
                    </div>
                    <div className={containerMenu}>
                        {dataMenu.slice(0, 4).map((item, index) => {
                            return <Menu content={item.content} key={index} />
                        })}
                    </div>
                </div>
                <div style={{ padding: '0 15px' ,
                    cursor:'pointer'
                }}
                    onClick={() => handleNavigateHome()}>
                    <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Logo.png" alt="logo" />
                </div>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        <div className={menu} >
                            <CiSearch size={'20px'} />
                            Search
                        </div>
                        <div className={menu} >
                            <CiUser size={'25px'} />
                            Sign In
                        </div>
                        <div onClick={handleNavigateBooking}>
                            <Button content={'Book Now'} />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Header