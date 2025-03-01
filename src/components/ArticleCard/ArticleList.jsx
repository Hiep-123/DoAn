import React from 'react';
import ArticleCard from './ArticleCard';
import styles from './styles.module.scss';

const ArticleList = () => {
    const { articleList, articleHeader, articleCards } = styles
    const articles = [
        {
            img: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/elementor/thumbs/Image_7-prf2zq0z59f62027aqc6z3danujj2dnt3rzv76jpas.jpg',
            title: 'The Fastest And Powerful',
            description: 'Divided together evening living fowl life together. Fish deep all void yielding.',
            author: 'Rose Tyler',
            date: 'April 5, 20220',
            link: '#',
        },
        {
            img: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/elementor/thumbs/Image_4-prf30vdvhyzs8ue4l87s0sxkssvoh27zxgp8bcudp0.jpg',
            title: '5 tips for travelers in USA',
            description: 'Integer maximus accumsan nunc same tempor lectus facilisis euras velelit.',
            author: 'Rose Tyler',
            date: 'January 5, 20220',
            link: '#',
        },
        {
            img: 'https://xstore.8theme.com/elementor/demos/rental-car/wp-content/uploads/sites/81/elementor/thumbs/Image_5-prf30j5z14j21wvvkkxmme0l2sjwozvhjs7x2rchxw.jpg',

            title: 'Cheap car rental in Europe',
            description: 'Nam magna odio placerat risus tsique viverra tincidunt nibhonec vitae.',
            author: 'Rose Tyler',
            date: 'February 5, 20220',
            link: '#',
        },
    ];

    return (
        <div className={articleList}>
            <div className={articleHeader}>
                <h1>NEWS & ARTICLES</h1>
                <p>Helps To Find Perfect Car</p>
            </div>
            <div className={articleCards}>
                {articles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleList;