import React from 'react'
import styles from './styles.module.scss'
import { dataMenu } from './constants'
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
<<<<<<< HEAD
import Button from '../Button/Button'
=======
import Button from '@components/Button/Button'
>>>>>>> 8d49d79 (update code section advanceHeadling)
function Header() {
    const { container, containerHeader, containerBox, containerMenu,
        containerBoxIcon, menu
    } = styles;
    return (
        <div className={container}>
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        <div style={{marginRight: '10px'}}>
                            <IoHomeOutline size={'20px'} color={'rgb(31, 244, 215)'} />
                        </div>
                    </div>
                    <div className={containerMenu}>
                        {dataMenu.slice(0, 4).map((item) => {
                            return <div className={menu} >{item.content}</div>
                        })}
                    </div>
                </div>
                <div style={{ padding: '0 15px' }}>
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
                        <div>
                            <Button content={'Book Now'} /> 
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Header