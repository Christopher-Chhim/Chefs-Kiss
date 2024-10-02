import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the Navbar component
export default function Navbar({ links }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Brand/Logo */}
                <a className="navbar-brand" href="/">
                    MyApp
                </a>
                
                {/* Toggle button for small screens */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {links.map((link, index) => (
                            <li key={index} className="nav-item">
                                {link}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
