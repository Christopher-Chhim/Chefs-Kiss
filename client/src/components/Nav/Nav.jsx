import React, { useState, useEffect } from 'react'; // Import necessary hooks
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Make sure the path is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../../utils/auth';

export default function Nav() {
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Example function to check if the user is logged in
    const checkAuth = () => {
        // This could be a call to your auth service or checking local storage
        const token = localStorage.getItem('id_token'); // Adjust according to your logic
        setIsLoggedIn(!!token); // Set state based on token presence
    };

    // Check authentication status on component mount
    useEffect(() => {
        checkAuth();
    }, []);

    const logout = () => {
        Auth.logout();
        window.location.assign('/')
    }

    return (
        <Navbar
            links={[
                <Link key={1} className="nav-link text-light" to="/">
                    Home
                </Link>,
                // Use a fragment to group the conditional links
                !isLoggedIn ? (
                    <>
                        <Link key={2} className="nav-link text-light" to="/signup">
                            Sign Up
                        </Link>
                        <Link key={3} className="nav-link text-light" to="/login">
                            Sign In
                        </Link>
                    </>
                ) : (
                    <>
                        <Link key={4} className="nav-link text-light" to="/profile">
                            My Profile
                        </Link>,
    
                        
                        <Link key={6} className="nav-link text-light" to="/post">
                            New Post
                        </Link>
                        <button key={7} className="nav-link text-light" to="/logout"  onClick={logout}>
                            Log Out
                        </button>
                    </>
                ),
            ]}
        />
    );
}
