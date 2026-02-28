"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

interface User {
    id: string;
    firstName: string;
    lastName?: string;
    role: string;
}

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = () => {
        fetch('/api/auth/me')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUser();
    }, [pathname]); // Re-fetch when navigating to ensure sync

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        router.push('/login');
        router.refresh();
    };

    const getInitials = (firstName: string, lastName?: string) => {
        return (firstName[0] + (lastName ? lastName[0] : '')).toUpperCase();
    };

    const getAvatarColor = (name: string) => {
        const colors = [
            '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <header className="navbar glass-panel">
            <div className="container navbar-content">
                <Link href="/" className="navbar-brand">
                    EH<span className="gradient-text">EventHUB</span>
                </Link>
                <nav className="navbar-links">
                    <Link href="/explore" className="nav-link">Explore</Link>
                    {user && (
                        <Link href="/profile" className="nav-link">Profile</Link>
                    )}
                    {user && (user.role === 'COLLEGE_ADMIN' || user.role === 'SYSTEM_ADMIN') && (
                        <Link href="/college" className="nav-link">Management</Link>
                    )}
                    <Link href="/about" className="nav-link">About</Link>
                </nav>
                <div className="navbar-actions">
                    <ThemeToggle />
                    {!loading && (
                        user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: getAvatarColor(user.firstName),
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        {getInitials(user.firstName, user.lastName)}
                                    </div>
                                    <span className="user-greeting" style={{ fontWeight: 600 }}>
                                        {user.firstName}
                                    </span>
                                </div>
                                <button onClick={handleLogout} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8125rem' }}>
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="nav-link" style={{ fontSize: '0.875rem' }}>Log In</Link>
                                <Link href="/signup" className="btn-primary" style={{ padding: 'var(--space-2) var(--space-6)' }}>Get Started</Link>
                            </>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}
