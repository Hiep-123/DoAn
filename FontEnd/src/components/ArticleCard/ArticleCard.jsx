import React from 'react';
import styles from './styles.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { BsTable } from 'react-icons/bs';
import { CiChat2 } from "react-icons/ci";

const ArticleCard = ({ title, description, author, date, link, img }) => {
    const { articleCard, articleFooter, articleImage, articleContent, boxIcon, Icon } = styles;
    return (
        <div className={articleCard}>
            <div>
                <img src={img} alt={title} className={articleImage} />
            </div>
            <div className={articleContent}>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={link}>Read More →</a>
                <div className={articleFooter}>
                    <div className={boxIcon}>
                        <div className={Icon}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap:'5px'
                            }}>
                                <FaUserCircle color={'#b4b4b4'} size={'22px'} />
                                <span
                                    style={{
                                        color: '#666',
                                        fontSize: '15px',
                                        fontWeight: '400',
                                    }}
                                >
                                    by {author}
                                </span>
                            </div>
                        </div>
                        <div className={Icon}>
                            <BsTable color={'#b4b4b4'} size={'20px'} />
                            <span
                                style={{
                                    color: '#666',
                                    fontSize: '15px',
                                }}
                            >
                                {date}
                            </span>
                            <CiChat2 color={'#b4b4b4'} size={'25px'} /> <span style={{
                                fontSize: '17px', textAlign: 'center',
                            }}>0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;