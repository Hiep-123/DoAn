import styles from '../styles.module.scss'
import ProductItem from '@components/ProductItem/ProductItem';
import { useNavigate } from "react-router";
import React from 'react'
import Loading from '@components/Loading/Loading';

function ListCar({ data, isLoading }) {
  const { container } = styles
  const navigate = useNavigate();

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
      <div className={container}>
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