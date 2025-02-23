import React, { useContext } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from '@components/ProductItem/ProductItem';
import { IoArrowForward, IoArrowBackOutline } from "react-icons/io5";
import './style.css'
import { StoreContext } from '@/context/StoreProvider';
function SliderCommon() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <IoArrowForward />,
        prevArrow: <IoArrowBackOutline />
    };
    const { data } = useContext(StoreContext)
    return (
        <Slider {...settings}>
            {data.map((item) => {
                return <ProductItem src={item.img}
                    categoryCar={item.category}
                    brandCar={item.brandCar}
                    price={item.price}
                    description={item.des}
                />
           
            })}
        </Slider>
    )
}

export default SliderCommon