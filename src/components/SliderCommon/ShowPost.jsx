import React from 'react'
import './style.css'
import { GoStarFill } from 'react-icons/go';

function ShowPost({ rating, name, country, post }) {
    return (
        <div className='containerPost'>
            <div style={{
                fontSize: '20px',
                margin: '25px 0'
            }}>{"⭐".repeat(rating || 0)}</div>
            <span style={{
                fontSize: '22px',
                color: '#555'
            }}>
                {post}
            </span>
            <span style={{
                fontSize:'22px',
                marginTop: '20px',
                fontweight: '800',
                color: '#3C43ED',
                marginBottom:'10px'
            }}>
                {name}
            </span>
            <span style={{
                fontSize:'18px',
                color:'#888'
            }}>
                {country}
            </span>
        </div >

    )
}

export default ShowPost