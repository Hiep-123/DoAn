import React from 'react'
import styles from './styles.module.scss'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
function Banner() {
    const { container, containerBanner, text1, text2, text3, shop } = styles;
    const location = useLocation();
    const minHeight = location.pathname === "/shop" ? "500px" : "836px";
    const navigate = useNavigate();
    return (
        <div className={container}
            style={{
                minHeight: `${minHeight}`
            }}>
            <div className={containerBanner}>
                {location.pathname === "/shop" ? (
                    <div className={shop}>
                        <p onClick={() => navigate('/')}>Home {'>'}</p> <span> SHOP</span>
                    </div>
                ) : (
                    <>
                        <h2 className={text1}>Welcome to our store</h2>
                        <h2 className={text2}>
                            #1 Car Rent Service In Your City.
                        </h2>
                        <div className={text3}>
                            Book a Car to your destination in town choose from a range of categories and prices.
                            The best way to travel to your destination
                        </div>
                        <div>
                            Home {'>'} SHOP
                        </div>
                    </>
                )}
            </div>

        </div >
    )
}

export default Banner