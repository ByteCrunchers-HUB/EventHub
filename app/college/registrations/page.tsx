'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Registration {
    id: string;
    status: string;
    createdAt: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        collegeId: string;
    };
    event: {
        id: string;
        title: string;
    };
}

export default function RegistrationsPage() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEventId, setSelectedEventId] = useState('all');

    useEffect(() => {
        fetch('/api/college/registrations')
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                setRegistrations(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const uniqueEvents = Array.from(new Set(registrations.map(r => JSON.stringify({ id: r.event.id, title: r.event.title }))))
        .map(s => JSON.parse(s));

    const filteredRegistrations = registrations.filter(r => {
        const matchesSearch =
            `${r.user.firstName} ${r.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEvent = selectedEventId === 'all' || r.event.id === selectedEventId;
        return matchesSearch && matchesEvent;
    });

    if (loading) {
        return (
            <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center', flex: 1 }}>
                <p>Loading registrations...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', flex: 1, display: 'flex', gap: 'var(--space-8)' }}>
            {/* Sidebar Navigation */}
            <aside style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="glass-panel" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>
                        Admin Portal
                    </div>
                    <Link href="/college" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Dashboard Overview
                    </Link>
                    <Link href="/college/create" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Create Event
                    </Link>
                    <Link href="/college/registrations" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-hover)', color: 'var(--color-text)', fontWeight: 600 }}>
                        Registrations
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-1)' }}>Registrations & Attendees</h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>Manage participants across your active events.</p>
                    </div>
                    <select
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(e.target.value)}
                        style={{
                            padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                            color: 'var(--color-text)', outline: 'none', fontWeight: 600, minWidth: '200px'
                        }}
                    >
                        <option value="all">All Events</option>
                        {uniqueEvents.map((event: any) => (
                            <option key={event.id} value={event.id}>{event.title}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)', alignItems: 'start' }}>

                    {/* Attendee List */}
                    <div className="glass-panel" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Search attendees by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%', maxWidth: '300px', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)',
                                    border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none'
                                }}
                            />
                            <button className="btn-secondary" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: '0.875rem' }}>Export CSV</button>
                        </div>

                        {filteredRegistrations.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                                        <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Name</th>
                                        <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Email</th>
                                        <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Event</th>
                                        <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Status</th>
                                        <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRegistrations.map(reg => (
                                        <tr key={reg.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                            <td style={{ padding: 'var(--space-4)', fontWeight: 500 }}>{reg.user.firstName} {reg.user.lastName}</td>
                                            <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{reg.user.email}</td>
                                            <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{reg.event.title}</td>
                                            <td style={{ padding: 'var(--space-4)' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    padding: '2px 8px',
                                                    borderRadius: 'var(--radius-full)',
                                                    background: reg.status === 'CONFIRMED' ? 'rgba(var(--hue-primary), 80%, 50%, 0.1)' : 'var(--color-surface-hover)',
                                                    color: reg.status === 'CONFIRMED' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600
                                                }}>{reg.status}</span>
                                            </td>
                                            <td style={{ padding: 'var(--space-4)' }}>
                                                <button style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>Manage</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                No registrations found.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
