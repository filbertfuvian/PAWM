import Link from 'next/link';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/about">About</Link>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-around',
        background: '#333',
        padding: '1rem',
        color: 'white',
    },
};

export default Navbar;