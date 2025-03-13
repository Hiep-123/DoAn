import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss"; // Import file SCSS
import { GoStarFill } from 'react-icons/go';
import className from 'classnames'
import { addComment } from "@/apis/commentService";
import { ToastContext } from "@/context/ToastProvider";

const ReviewForm = () => {
    const { reviewForm, title, subtitle, ratingSection,
        stars, formGroup, submitBtn, active, required
    } = styles;
    const { toast } = useContext(ToastContext)
    const [length, setLength] = useState([1, 2, 3, 4, 5]);  // Bắt đầu với 1 sao
    const [selected, setSelected] = useState();
    const [rating, setRating] = useState(0);//rating
    const [comment, setComment] = useState(''); //review
    const [name, setName] = useState(); //name
    const [email, setEmail] = useState(); // email

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

    const handleAddComment = async () => {
        const data = {
            bookingId: '67d1856049ef41607d2ff4c7',
            userId: '67d1856049ef41607d2ff4c7',
            ratingPoints: rating,
            comment,
            name,
            email
        }

        addComment(data).catch((err) => {
            console.log(err)
        })


        if (addComment) {
            toast.success('You rate the booking service successfully')
        }
    }

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
                <label>Your review booking <span className={required}>*</span></label>
                <textarea rows="5" placeholder="Write your review here..."
                    onChange={(e) => setComment(e.target.value)}></textarea>
            </div>

            <div className={formGroup}>
                <label>Name <span className={required}>*</span></label>
                <input type="text" placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <div className={formGroup}>
                <label>Email <span className={required}>*</span></label>
                <input type="email" placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)} />
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

            <button className={submitBtn}
                style={{
                    cursor: 'pointer',
                    marginTop:'15px'
                }}
                onClick={handleAddComment}>SUBMIT</button>
        </div>
    );
};

export default ReviewForm;
