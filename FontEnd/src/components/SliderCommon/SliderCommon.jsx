import React, { useContext } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from '@components/ProductItem/ProductItem';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import './style.css'
import ShowPost from './showPost';
import { useNavigate } from "react-router";
import { StoreContext } from '@/context/StoreProvider';
function SliderCommon({ isPost, dataPost }) {

    const { data } = useContext(StoreContext)
    const navigate = useNavigate();

    const CustomNextArrow = ({ onClick, isPost }) => {
        return (
            <IoIosArrowRoundForward
                className={`slick-arrow slick-next ${isPost ? "testimonial-arrow" : "product-arrow"}`}
                onClick={onClick}
            />
        );
    };

    // Mũi tên prev
    const CustomPrevArrow = ({ onClick, isPost }) => {
        return (
            <IoIosArrowRoundBack
                className={`slick-arrow slick-prev ${isPost ? "testimonial-arrow" : "product-arrow"}`}
                onClick={onClick}
            />
        );
    };
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isPost ? 1 : 3,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow isPost={isPost} />,
        prevArrow: <CustomPrevArrow isPost={isPost} />
    };

    const handleNavigateDetailProduct = (name) => {
        const path = `/shop/${name.replace(/ /g, "-")}`;
        navigate(path)
    }

    return (

        <div className={isPost ? "testimonial-slider" : ''}>
            <Slider {...settings}>
                {isPost
                    ? dataPost?.map((item) => (
                        <ShowPost rating={item.rating} name={item.name} country={item.country} post={item.post} />
                    ))
                    : data?.map((item, index) => (
                        <div key={index} onClick={() => handleNavigateDetailProduct(item.brandCar)}>
                            <ProductItem
                                src={item.img}
                                categoryCar={item.category}
                                brandCar={item.brandCar}
                                price={item.price}
                                description={item.des}
                            />
                        </div>
                    ))}
            </Slider>

        </div>
    )
}

export default SliderCommon
