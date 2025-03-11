import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { GoStarFill } from 'react-icons/go';
import { useLocation } from "react-router-dom";
import { BookingContext } from '@/context/BookingProvider';
import classNames from 'classnames';
function ProductItem({ src, categoryCar, brandCar, price, description }) {
    const { container, containerProduct, containerItem, category, title, des,
        containerList, containerListProduct, box1, box2, girdItem,listProduct
    } = styles;
    const location = useLocation();
    const { isShowGrid } = useContext(BookingContext)

    const width = location.pathname === '/shop' ? '402px' : '410px'
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
        <div className={!isShowGrid ? containerList : container}
            style={{
                width: `${!isShowGrid ? '' : width}`,
                height: `${!isShowGrid ? '' : height}`
            }}>
            <div className={!isShowGrid ?listProduct :containerProduct} >
                <div className={!isShowGrid ? containerListProduct : containerItem}>
                    <div className={!isShowGrid ? box1 : ''}>
                        <img src={src} alt=""
                            width={230} height={130} />
                    </div>
                    <div className={!isShowGrid ? box2 : girdItem}>
                        <span className={category}>{brandCar}</span>
                        <div className={title}>{categoryCar}</div>
                        <div style={{ marginTop: '5px' }}>{renderStar(5)}</div>
                        <div style={{
                            marginTop: '5px',
                            fontSize: '20px',
                            color: '#888',
                            fontWeight: '500'
                        }}>Price Per Day: ${price}.00</div>
                        <div className={des}>
                            {description}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ProductItem