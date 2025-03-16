import React from 'react'
import styles from './styles.module.scss'

function InputCommon({ label, value, onChange, type = "text", required = true, placeholder }) {
    const { boxInput } = styles
    return (
        <div className={boxInput}>
            <div>{label} <span>*</span></div>
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

export default InputCommon