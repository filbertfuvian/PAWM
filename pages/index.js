// pages/index.js
import Link from 'next/link';
import styles from '../styles/Home.module.css'


const courses = [
    { id: 1, title: 'Matematika', image: '/math.jpg', link:'/courses/math' },
    { id: 2, title: 'Fisika', image: '/physics.webp', link:'/courses/physics' },
    { id: 3, title: 'Kimia', image: '/chemistry.jpeg', link:'/courses/chemistry' },
    { id: 4, title: 'Computational', image: '/computer.jpg', link:'/courses/computer' },
	{ id: 5, title: 'Artificial Intelligence', image: '/ai.webp', link:'/courses/ai' },
	{ id: 6, title: 'Olahraga', image: '/olahraga.png', link:'/courses/olahraga' },
    { id: 7, title: 'Bahasa Indonesia', image: '/bahasa.jpg', link:'/courses/bahasa' },
    { id: 8, title: 'English', image: '/english.jpg', link:'/courses/english' },
    { id: 9, title: 'Pancasila', image: '/pancasila.jpg', link:'/courses/pancasila' },
];

export default function Home() {
    return (
        <div>
            <header className={styles.header}>
                <h1>Welcome to Virtual Lab</h1>
                <p>Explore various courses and enhance your skills!</p>
            </header>
            <main className={styles.main}>
                <div className={styles.container_title}>
                    Lanjutkan course kamu
                </div>
                <div
                    className={styles.cardContainer}
                >
                    {courses.map(course => (
                        <Link key={course.id} href={course.link} passHref>
                            <div className={styles.card}>
                                <img src={course.image} alt={course.title} className={styles.cardImage} draggable='false' />
                                <h3>{course.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <div className={styles.container_title}>
                    Lanjutkan course kamu
                </div>
                <div
                    className={styles.cardContainer}
                >
                    {courses.map(course => (
                        <Link key={course.id} href={course.link} passHref>
                            <div className={styles.card}>
                                <img src={course.image} alt={course.title} className={styles.cardImage} draggable='false' />
                                <h3>{course.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}