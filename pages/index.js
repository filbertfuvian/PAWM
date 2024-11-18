import Link from 'next/link';
import styles from '../styles/Home.module.css'


const courses = [
    { id: 1, title: 'Matematika', image: 'PAWM/public/math.jpg', link:'/courses/math' },
    { id: 2, title: 'Fisika', image: 'PAWM/public/physics.webp', link:'/courses/physics' },
    { id: 3, title: 'Kimia', image: 'PAWM/public/chemistry.jpeg', link:'/courses/chemistry' },
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
                    Available courses
                </div>
                <div className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className={styles.container_title}>
                    Available courses
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