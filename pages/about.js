import React from 'react';
import styles from '../styles/About.module.css';
const About = () => {
    return (
        <div className={styles['about-container']}>
            <h1 className={styles['about-heading']}>About Me</h1>
            <p className={styles['about-paragraph']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>
        </div>
    );
};

export default About;