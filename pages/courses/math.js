import Navbar from '../../components/Navbar';
import styles from '../../styles/Course.module.css';

const Course1 = () => {
    return (
        <div>
            <Navbar />
            <h1 className={styles.h1}>Course 1</h1>
            <p>This is the details for Course 1.</p>
        </div>
    );
};

export default Course1;