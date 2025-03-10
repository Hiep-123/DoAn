import React from 'react'
import styles from './styles.module.scss'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function LoadingTextCommon() {
    const { rotate, overlayLoading } = styles
    return (
        <div className={overlayLoading}>
            <AiOutlineLoading3Quarters className={rotate} />
        </div>
    )
}

export default LoadingTextCommon