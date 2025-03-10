import React from 'react'
import styles from './styles.module.scss'
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
function Banner() {
    const { container, containerBanner, text1, text2, text3, shop, shopDetail } = styles;
    const location = useLocation();
    const navigate = useNavigate();
    const { ProductName } = useParams();
    const minHeight = location.pathname.startsWith("/shop/") && location.pathname !== "/shop"
    ? "400px"  // Nếu là trang chi tiết sản phẩm (bắt đầu bằng /shop/ nhưng không phải /shop)
    : location.pathname === "/shop"
    ? "500px"  // Nếu là trang /shop
    : "836px"; // Các trang khác


    return (
        <div
            className={container}
            style={{
                minHeight: `${minHeight}`
            }}
        >
            <div className={containerBanner}
            style={{
                height:`${ProductName ??'200px'}`
            }}>
                {location.pathname.startsWith("/shop") ? (
                    location.pathname === "/shop" ? (
                        // Nếu chỉ ở trang /shop
                        <div className={shop}>
                            <p onClick={() => navigate('/')}>Home {'>'}</p> <span> SHOP</span>
                        </div>
                    ) : (
                        // Nếu ở trang chi tiết sản phẩm /shop/...
                        <div className={shopDetail}>
                            <div className={shop}>
                                <p  style={{
                                    cursor:'pointer'
                                }} 
                                onClick={() => navigate('/')}>Home {'>'}</p>
                                <p style={{
                                    marginLeft:'5px'
                                }}> SHOP</p>
                            </div>
                            <span>
                                {decodeURIComponent(location.pathname.split("/shop/")[1].replace(/-/g, " "))}
                            </span>
                        </div>
                    )
                ) : (
                    // Nội dung mặc định cho các trang khác
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
        </div>
    );

}

export default Banner