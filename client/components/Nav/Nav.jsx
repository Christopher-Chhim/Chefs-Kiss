
import { Link } from 'react-router-dom';
import Navbar from './UI/Navbar';

export default function Nav() {
    
    return (
        <Navbar
            links={[
                <Link key={1} className="nav-link text-light" to="/">
                    Home
                </Link>,
                <Link key={2} className="nav-link text-light" to="/profile">
                    My Profile
                </Link>,
                <Link key={2} className="nav-link text-light" to="/feed">
                    My feed
                </Link>,
                <Link key={2} className="nav-link text-light" to="/post">
                    New Post
                </Link>,
                <Link key={2} className="nav-link text-light" to="/signin">
                    Sign In
                </Link>,
                <Link key={2} className="nav-link text-light" to="/logout">
                    Log Out
                </Link>,
            ]}
        />
    );
}
