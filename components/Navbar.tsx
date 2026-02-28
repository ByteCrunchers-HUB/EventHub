import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
    return (
        <header className="navbar glass-panel">
            <div className="container navbar-content">
                <Link href="/" className="navbar-brand">
                    Event<span className="gradient-text">Hub</span>
                </Link>
                <nav className="navbar-links">
                    <Link href="/explore" className="nav-link">Explore</Link>
                    <Link href="/college" className="nav-link">Colleges</Link>
                    <Link href="/about" className="nav-link">About</Link>
                </nav>
                <div className="navbar-actions">
                    <Link href="/login" className="btn-secondary">Log In</Link>
                    <Link href="/signup" className="btn-primary">Get Started</Link>
                </div>
            </div>
        </header>
    );
}
