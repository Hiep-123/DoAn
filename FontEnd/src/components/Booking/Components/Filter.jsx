import React, { useContext } from 'react'
import { TfiLayoutGrid4 } from 'react-icons/tfi';
import { CiCircleList } from 'react-icons/ci';
import styles from '../styles.module.scss'
import SelectBox from './SelectBox';
import { BookingContext } from '@/context/BookingProvider';
function Filter() {
    const { containerFilter, boxLeft, boxRight, boxIcon } = styles
    const { sortOptions, showOptions, setSortId, setShowId, setIsShowGrid } = useContext(BookingContext);

    const handleGetValue = (value, type) => {
        if (type === 'sort') {
            setSortId(value)
        } else {
            setShowId(value)
        }
    }

    const handleShowGrid = (type) => {
        setIsShowGrid(type === 'grid')
    }

    return (
        <div className={containerFilter}>
            <div className={boxLeft}>
                <SelectBox options={sortOptions}
                    type='sort'
                    getValue={handleGetValue}
                />
                <div className={boxIcon}>
                    <TfiLayoutGrid4 size={'25px'} style={{ cursor: 'pointer' }}
                        onClick={() => handleShowGrid('grid')} />
                    <div style={{
                        height: '25px',
                        width: '1px',
                        backgroundColor: '#e1e1e1'
                    }} />
                    <CiCircleList size={'28px'} color={'#222'} style={{ cursor: 'pointer' }}
                        onClick={() => handleShowGrid('list')} />
                </div>
            </div>
            <div className={boxRight}>
                <div style={{
                    fontSize: '22px',
                    color: '#888'
                }}>
                    Show
                </div>
                <SelectBox options={showOptions}
                    type='show'
                    getValue={handleGetValue}
                />
            </div>
        </div>
    )
}

export default Filter