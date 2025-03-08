import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss"; // Import file SCSS
import { GoStarFill } from 'react-icons/go';
import className from 'classnames'

const ReviewForm = () => {
    const { reviewForm, title, subtitle, ratingSection,
        stars, formGroup, submitBtn, active, required
    } = styles
    // Hàm xử lý khi người dùng chọn đánh giá
    const [length, setLength] = useState([1, 2, 3, 4, 5]);  // Bắt đầu với 1 sao
    const [selected, setSelected] = useState();
    const [rating, setRating] = useState(0);
    const renderStar = (length, isActive) => {
        return Array.from({ length }, (_, index) => (
            <GoStarFill
                size={'22px'}
                key={index}
                style={{
                    color: isActive ? '#fbb034' : '#ccc',
                    marginRight: '5px'
                }}
            />
        ));
    };

    const handleStarClick = (index) => {
        setSelected(index + 1);  // Cập nhật vị trí được chọn
        setRating(index + 1);    // Cập nhật giá trị rating
    };
    return (
        <div className={reviewForm}>
            <h3 className={title}>BE THE FIRST TO REVIEW “TOYOTA CAYENNE”</h3>
            <p className={subtitle}>
                Your email address will not be published. Required fields are marked
            </p>

            <div className={ratingSection}>
                <label>Your rating <span >*</span></label>
                <div className={stars}>
                    {length.map((item, index) => {
                        return <div className={className(
                            { [active]: selected }
                        )}
                            key={index}
                            onClick={() => handleStarClick(index)}>
                            {renderStar(index + 1, selected === index + 1)}
                        </div>
                    })}
                </div>
            </div>

            <div className={formGroup}>
                <label>Your review <span className={required}>*</span></label>
                <textarea rows="5" placeholder="Write your review here..."></textarea>
            </div>

            <div className={formGroup}>
                <label>Name <span className={required}>*</span></label>
                <input type="text" placeholder="Enter your name" />
            </div>

            <div className={formGroup}>
                <label>Email <span className={required}>*</span></label>
                <input type="email" placeholder="Enter your email" />
            </div>

            <div className={formGroup}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                <input type="checkbox" id="save-info"
                    style={{
                        width: '20px'
                    }} />
                <label htmlFor="save-info">
                    Save my name, email, and website in this browser for the next time I comment.
                </label>
            </div>

            <button className={submitBtn}>SUBMIT</button>
        </div>
    );
};

export default ReviewForm;
