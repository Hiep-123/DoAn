import React from 'react'
import styles from './styles.module.scss'
import { GoStarFill } from 'react-icons/go';
import { useLocation } from "react-router-dom";

function ProductItem({ src, categoryCar, brandCar, price, description }) {
    const { container, containerProduct, containerItem, category, title, des } = styles;

    const location = useLocation();

    const width = location.pathname === '/shop' ? '319px' : '410px'
    const height = location.pathname === '/shop' ? '380px' : '420px'


    const renderStar = (length) => {
        return Array.from({ length }, (_, index) => (
            <GoStarFill
                size={'22px'}
                key={index}
                style={{
                    color: 'rgb(248, 248, 17)',
                }}
            />
        ));
    };

    return (
        <div className={container}
            style={{
                width: `${width}`,
                height: `${height}`
            }}>
            <div className={containerProduct} >
                <div className={containerItem}>
                    <img src={src} alt=""
                        width={230} height={130} />
                    <span className={category}>{brandCar}</span>
                    <div className={title}>{categoryCar}</div>
                    <div style={{ marginTop: '5px' }}>{renderStar(5)}</div>
                    <div style={{
                        marginTop: '5px',
                        fontSize: '20px',
                        color: '#888',
                        fontWeight: '500'
                    }}>${price}.00</div>
                    <div className={des}>
                        {description}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ProductItem