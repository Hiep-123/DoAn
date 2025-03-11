import styles from '../styles.module.scss'
import ProductItem from '@components/ProductItem/ProductItem';
import { useNavigate } from "react-router";
import React, { useContext } from 'react'
import Loading from '@components/Loading/Loading';
import { BookingContext } from '@/context/BookingProvider';
import className from 'classnames'

function ListCar({ data, isLoading }) {
  const { container, containerList } = styles
  const navigate = useNavigate();
  const { isShowGrid } = useContext(BookingContext)
  const handleNavigateDetailProduct = (name) => {
    const path = `/shop/${name.replace(/ /g, "-")}`;
    navigate(path)
  }
  return (
    isLoading ? (
      <div className="overlayLoading">
        <Loading />
      </div>
    ) : (
      <div className={className(container, {
        [containerList]: !isShowGrid
      })}>
        {data?.map((item) => (
          <div key={item.id || item.category} onClick={() => handleNavigateDetailProduct(item.category)}>
            <ProductItem
              src={item.img}
              categoryCar={item.category}
              brandCar={item.brandId?.nameBrandCar}
              price={item.pricePerDay}
              description={item.des}
            />
          </div>
        ))}
      </div>
    )
  );

}

export default ListCar