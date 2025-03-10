import React from 'react'
import styles from './styles.module.scss'
import SliderCommon from '@components/SliderCommon/SliderCommon';
import useTranslateXImage from '@/hooks/translateXImage';

function Populate() {
    const { container, containerBox1, containerBox2, title, des, img, downloadApp, dowloadBox, downloadButtons } = styles
    const { translateXPosition } = useTranslateXImage();



    const dataPost = [
        { post: '“We don’t take ourselves too seriously, but seriously enough to ensure we’re creating the best product and experience for our customers. I feel like Help Scout does the same.”', name: 'Lusicca Williams', country: 'CEO & Founder', rating: '5' },
        { post: 'This is by far the best theme on Themeforest. It adapts to a lot of the plugins, and their customer support is great. I really love this theme! Thanks 8theme.', name: 'Judith Mckinney', country: 'Seychelles', rating: '4' },
    ]

    return (
        <div className={container}>
            <div className={containerBox1}>
                <div className={title}>
                    Testimonials
                </div>
                <h1 className={des}>
                    What Say Our Clients <span style={{ color: '#3C43ED' }}>Let’s Check Check</span>
                </h1>
                <div style={{
                    width: '800px'
                }}>
                    <SliderCommon dataPost={dataPost} isPost />
                </div>
            </div>
            
            <div className={containerBox2}>
                <div className={img} style={{
                    transform: `translateX(${translateXPosition}px)`,
                    transition: 'transform 1,5s ease'
                }}>
                    <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image-min.png" alt=""
                        width={620} height={680} />
                </div>
            </div>

            <div className={downloadApp}>
                <div className={dowloadBox}>
                    <h2>Download Our App Now! - XStore</h2>
                    <p>
                        We’re putting a car in your pocket so you can escape the city at top of button.
                    </p>
                </div>
                <div className={downloadButtons}>
                    <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Group-9-min.png" alt=""
                        width={400} height={60} 
                        style={{cursor:'pointer'}}/>
                </div>
            </div>
        </div >

    )
}

export default Populate
