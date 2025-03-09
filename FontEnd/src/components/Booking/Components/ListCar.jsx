import React from 'react'
import styles from '../styles.module.scss'
import ProductItem from '@components/ProductItem/ProductItem';

function ListCar({ data }) {
  const { container } = styles
  return (
    <div className={container}>
      {data?.map((item) => (
        <ProductItem
          key={item.id}  // Thêm key nếu có id duy nhất
          src={item.img}
          categoryCar={item.category}
          brandCar={item.brandCar}
          price={item.price}
          description={item.des}
        />
      ))}

    </div>
  )
}

export default ListCar