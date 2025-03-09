import React, { useContext } from 'react'
import MainLayout from '@components/Layout/Layout'
import styles from './styles.module.scss'
import SliderCommon from '@components/SliderCommon/SliderCommon';
import { SiHonda, SiMazda, SiMercedes, SiToyota } from "react-icons/si";
import { StoreContext } from '@/context/StoreProvider';

function ShowCar() {
    const { container, title, des, subDes, boxIcon, icon, lineRight, lineLeft } = styles
    const { data } = useContext(StoreContext)


    return (
        <MainLayout>
            <div className={container}>
                <div className={title}>
                    Vehicle Models
                </div>
                <div className={des}>
                    Meet Awesome <span>Fleet</span>
                </div>
                <div className={subDes}>
                    From compact 3-door cars to spacious SUVs and vans, we have everything you need
                </div>
                <div>
                    <SliderCommon data={data} />
                </div>
            </div>
            <div className={lineLeft} />

            <div className={boxIcon}>

                <div className={icon} style={{ cursor: 'pointer' }}>
                    <SiHonda color={'#3C43ED'} size={'60px'} /> <span style={{
                        color: '#3C43ED',
                        fontSize: '30px',
                        fontWeight: '700',
                    }}>HONDA</span>
                </div>

                <div className={icon} style={{ cursor: 'pointer' }}>
                    <SiMazda color={'#3C43ED'} size={'60px'} /> <span style={{
                        color: '#3C43ED',
                        fontSize: '30px',
                        fontWeight: '700'
                    }}>MAZDA</span>
                </div>

                <div className={icon} style={{ cursor: 'pointer' }}>
                    <SiMercedes color={'#3C43ED'} size={'60px'} /> <span style={{
                        color: '#3C43ED',
                        fontSize: '30px',
                        fontWeight: '700'
                    }}>MERCEDES</span>
                </div>

                <div className={icon} style={{ cursor: 'pointer' }}>
                    <SiToyota color={'#3C43ED'} size={'60px'} /> <span style={{
                        color: '#3C43ED',
                        fontSize: '30px',
                        fontWeight: '700'
                    }}>TOYOTA</span>
                </div>

            </div>
            <div className={lineRight} />
        </MainLayout>
    );

}

export default ShowCar