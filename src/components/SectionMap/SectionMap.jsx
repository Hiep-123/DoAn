import React from "react";
import styles from './styles.module.scss'
import { FaLocationDot } from "react-icons/fa6";
const SectionMap = () => {
  const { containerClass, titleClass, subtitleClass, descriptionClass, countriesListClass, contactClass, mapClass, locationPinClass, boxInfo, Box1,
    Box2, Box3, Box4
  } = styles

  return (
    <div className={containerClass}>
      <div className={mapClass}>
        <div className={locationPinClass}>
          <FaLocationDot color={'#3b82f6'} size={'30px'} />
          <div className={Box1}>
            <img src="https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image-1.jpeg" alt=""
              width={360} height={190} />
            <h2>
              Cambria Heights
            </h2>
            <div>
              Address - 2715 Ash Dr. San Jose, 83475
            </div>
            <div >
              Phone - (406) 555-0120
            </div>
          </div>
        </div>

        <div className={locationPinClass}>
          <FaLocationDot color={'#3b82f6'} size={'30px'} />
          <div className={Box4}>
            <img src="https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image-1.jpeg" alt=""
              width={360} height={190} />
            <h2>
              Cambria Heights
            </h2>
            <div>
              Address - 2715 Ash Dr. San Jose, 83475
            </div>
            <div >
              Phone - (406) 555-0120
            </div>
          </div>
        </div>

        <div className={locationPinClass}>
          <FaLocationDot color={'#3b82f6'} size={'30px'} />
          <div className={Box3}>
            <img src="https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image-1.jpeg" alt=""
              width={360} height={190} />
            <h2>
              Cambria Heights
            </h2>
            <div>
              Address - 2715 Ash Dr. San Jose, 83475
            </div>
            <div >
              Phone - (406) 555-0120
            </div>
          </div>
        </div>

        <div className={locationPinClass}>
          <FaLocationDot color={'#3b82f6'} size={'30px'} />
          <div className={Box2}>
            <img src="https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Image-1.jpeg" alt=""
              width={360} height={190} />
            <h2>
              Cambria Heights
            </h2>
            <div>
              Address - 2715 Ash Dr. San Jose, 83475
            </div>
            <div >
              Phone - (406) 555-0120
            </div>
          </div>
        </div>
      </div>

      <div className={boxInfo}>
        <h3 className={subtitleClass}>PICK & LEAVE CAR</h3>
        <h2 className={titleClass}>XStore Elementor <span style={{ paddingLeft: '10px' }}>Rental Car Demo</span></h2>
        <p className={descriptionClass}>
          Aliquam erats volutpat. Integer malesuada to fringilla suscipit Maecenas ultrices orci vitae convallis mas,
          quam nulla vehicula felis, eu cursus sem tellus eget elit.
        </p>
        <div className={countriesListClass}>
          <span><span style={{ color: '#3b82f6' }}>{">"}</span> Great Britain (12)</span>
          <span><span style={{ color: '#3b82f6' }}>{">"}</span> Australia (34)</span>
          <span><span style={{ color: '#3b82f6' }}>{">"}</span> Singapore (80)</span>
          <span><span style={{ color: '#3b82f6' }}>{">"}</span> Luxembourg (45)</span>
          <span><span style={{ color: '#3b82f6' }}>{">"}</span> United Arab (9)</span>
          <span><span style={{ color: '#3b82f6' }}>{">"}</span> +9 More Countries</span>
        </div>

        <div className={contactClass}>
          <img src="https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Group-11-min.png" alt="Agent"
            width={100} height={100} />
          <span>Call Us For Booking Your Vehicle. <a href="tel:+17553028549">+1 (755) 302-8549</a></span>
        </div>
      </div>
    </div>
  );
};

export default SectionMap;
