import React from "react";
import styles from "./styles.module.scss";
import Button from '../Button/Button'

const Footer = () => {
    const { footer, logoSection, linksSection, subscribeSection, copyright, section } = styles;

    return (
        <footer className={footer}>
            <div className={section}>
                <div className={logoSection}>
                    <img src="https://xstore.b-cdn.net/elementor/demos/rental-car/wp-content/uploads/sites/81/2022/07/Footer-Logo.png" alt=""
                        width={250} />
                    <p>If you have any questions or need help, feel free to contact with our team.</p>
                    <p><a href="tel:+1088456888">+1 (088) 456888 (24/7)</a></p>
                    <p>3rd Avenue, New StreetsUpper East Side, San Francisco, USA</p>
                    <p ><a href="mailto:informations@xstore.com"
                        style={{
                            color: '#b8b5b5'
                        }}>informations@xstore.com</a></p>
                </div>

                <div className={linksSection}>
                    <h3>Usefull Links</h3>
                    <ul>
                        <li>{"<"} Latest Cars</li>
                        <li>{"<"} Featured Cars</li>
                        <li>{"<"} Sell Your Car</li>
                        <li>{"<"} Buy a Car</li>
                        <li>{"<"} Reviews</li>
                        <li>{"<"} Latest News</li>
                        <li>{"<"} Our Services</li>
                        <li>{"<"} About XStore</li>
                        <li>{"<"} My Inventory</li>
                        <li>{"<"} Book a Car</li>
                        <li>{"<"} Contact Us</li>
                    </ul>
                </div>

                <div className={subscribeSection}>
                    <h3 >Subscribe Us</h3>
                    <p style={{
                        color: '#b8b5b5',
                        fontSize: '22px'
                    }}>Get our weekly newsletter for latest car news exclusive offers and deals and more.</p>
                    <input type="email" placeholder="Enter Email Address..." />
                    <Button content={'Subscribe'} />
                </div>
            </div>
            <div className={copyright}>
                <p>Copyright © 2024 XStore theme. Created by 8theme – WordPress WooCommerce themes.</p>
            </div>
        </footer>
    );
};

export default Footer;