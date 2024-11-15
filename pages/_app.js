// pages/_app.js
import NavBar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;