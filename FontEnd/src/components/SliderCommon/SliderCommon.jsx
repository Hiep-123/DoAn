import React, { useContext } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from '@components/ProductItem/ProductItem';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import './style.css';
import ShowPost from './showPost';
import { useNavigate } from "react-router";
import { StoreContext } from '@/context/StoreProvider';
import Loading from '@components/Loading/Loading';

function SliderCommon({ isPost, dataPost, isLoading }) {
    const { listCar } = useContext(StoreContext);
    const navigate = useNavigate();

    const CustomNextArrow = ({ onClick, isPost }) => {
        return (
            <IoIosArrowRoundForward
                className={`slick-arrow slick-next ${isPost ? "testimonial-arrow" : "product-arrow"}`}
                onClick={onClick}
            />
        );
    };

    const CustomPrevArrow = ({ onClick, isPost }) => {
        return (
            <IoIosArrowRoundBack
                className={`slick-arrow slick-prev ${isPost ? "testimonial-arrow" : "product-arrow"}`}
                onClick={onClick}
            />
        );
    };

    const settings = {
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
        navigate(path);
    };

    return (
        <>
            {isLoading ? (
                <div className="overlayLoading">  {/* 👉 Sửa thành chuỗi nếu là className */}
                    <Loading />
                </div>
            ) : (
                <div className={isPost ? "testimonial-slider" : ''}>
                    <Slider {...settings}>
                        {isPost
                            ? dataPost?.map((item, index) => (
                                <ShowPost
                                    key={index}  // 👉 Thêm key vào đây
                                    rating={item.rating}
                                    name={item.name}
                                    country={item.country}
                                    post={item.post}
                                />
                            ))
                            : listCar?.map((item, index) => (
                                <div key={index} onClick={() => handleNavigateDetailProduct(item.category)}>
                                    <ProductItem
                                        src={item.img}
                                        categoryCar={item.category}
                                        brandCar={item.brandId.nameBrandCar}
                                        price={item.pricePerDay}
                                        description={item.des}
                                    />
                                </div>
                            ))}
                    </Slider>
                </div>
            )}
        </>
    );
}

export default SliderCommon;
