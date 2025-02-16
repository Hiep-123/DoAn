import React from 'react'
import styles from '../styles.module.scss'
function ShowInfoOffer({ data }) {
    const { boxIcon, icon ,showIcon} = styles
    return (
        <div className={boxIcon}>
            <div className={icon}>
                {data.map((item, index) => {
                    return <div key={index} >
                        <img src={item.src} alt={item.title} width={70} height={60}/>
                        <div >{item.title}</div>
                    </div>

                })}
            </div>
        </div>
    )
}

export default ShowInfoOffer