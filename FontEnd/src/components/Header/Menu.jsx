import React from 'react'
import styles from './styles.module.scss'
import { useLocation } from 'react-router-dom'
function Menu({ content }) {
    const { menu } = styles
    const location = useLocation();

    const handleRenderText = (content) => {
        return content
    }


    const handleHighLight = (content) => {
        if (content === 'Rent A Car' && location.pathname === '/shop') {
            return 'rgb(31, 244, 215)'
        }
    }


    return (
        <div className={menu}
            style={{
                color: `${handleHighLight(content)}`
            }}>
            {handleRenderText(content)}
        </div>
    )
}

export default Menu