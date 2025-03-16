import React from 'react'
import styles from './styles.module.scss'

function Step() {
    const { containeStep, boxStep, box1, shape, line } = styles
    return (
        <div className={containeStep}>
            <div className={boxStep}>
                <div className={box1}>
                    <div className={shape}>
                        1
                    </div>
                    <div>
                        BOOKING CAR
                    </div>
                </div>

                <div className={line} />

                <div className={box1}>
                    <div className={shape}>
                        2
                    </div>
                    <div>CHECKOUT</div>
                </div>

            </div>
        </div>
    )
}

export default Step