import Link from 'next/link';
import {useState, useEffect }from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from '../styles/Navbar.module.css';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { getUserNickname } from '../lib/getNickname';

const NavBar = () => {
    const courses = [
        { id: 1, name: 'Matematika', link: '/courses/math' },
        { id: 2, name: 'Fisika', link: '/courses/physics' },
        { id: 3, name: 'Kimia', link: '/courses/chemistry' },
    ];

      const [nickname, setNickname] = useState('User ');

      useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
              const userNickname = await getUserNickname(user.uid);
              setNickname(userNickname || 'User '); 
          }
          });
  
          return () => unsubscribe();
      }, []);


      const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log('User  signed out');
          window.location.reload();
        } catch (error) {
          console.error('Error signing out: ', error);
        }
      };
    
      
    return (
        <Navbar className={styles.navbar} expand="lg">
            <Navbar.Brand className={styles['navbar-brand']} href="/">VirtualLab</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={styles['nav']}>
                    <div className={styles['nav']}>
                        <div className={styles['nav-left']}> 
                            <Nav.Link className={styles['nav-link']} as={Link} href="/">Home</Nav.Link>

                            <NavDropdown title="Courses" id="basic-nav-dropdown" className={styles['dropdown-toggle']}>
                                {courses.map(course => (
                                <NavDropdown.Item className={styles['dropdown-item']} key={course.id} as={Link} href={course.link}>
                                    {course.name}
                                </NavDropdown.Item>
                                ))}          
                            </NavDropdown>

                            <Nav.Link className={styles['nav-link']} as={Link} href="/about">About</Nav.Link>
                        
                        </div>


                        <div className={styles['nav-right']}> 
                            <Nav.Link className={styles['nav-link']} as={Link} href="/login">Login</Nav.Link>

                            <Nav.Link className={styles['nav-link']} as={Link} href="/register">Register</Nav.Link>

                            <button className={styles['logout']} onClick={handleLogout}>Logout</button>

                            <Nav.Link className={styles['nav-link']} as={Link} href="/userprofile">Welcome, {nickname}</Nav.Link>
                    
                        </div>
                    </div>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
};

export default NavBar;