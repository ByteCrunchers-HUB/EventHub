'use client';

import { useState } from 'react';
import EventCard, { EventProps } from '@/components/EventCard';

// Dummy Data
const DUMMY_EVENTS: EventProps[] = [
    { id: '1', title: 'Global Hackathon 2026', category: 'Tech', date: 'March 15, 2026', location: 'Main Auditorium', organizer: 'Computer Science Dept' },
    { id: '2', title: 'Spring Cultural Fest', category: 'Cultural', date: 'April 2, 2026', location: 'Open Grounds', organizer: 'Student Union' },
    { id: '3', title: 'AI & Future of Work Seminar', category: 'Tech', date: 'March 20, 2026', location: 'Seminar Hall B', organizer: 'Placement Cell' },
    { id: '4', title: 'Inter-College Basketball Tournament', category: 'Sports', date: 'April 10, 2026', location: 'Sports Complex', organizer: 'Athletics Committee' },
    { id: '5', title: 'Photography Workshop', category: 'Arts', date: 'March 25, 2026', location: 'Design Lab', organizer: 'Photography Club' },
    { id: '6', title: 'Web3 Onboarding Workshop', category: 'Tech', date: 'March 28, 2026', location: 'Lab 4', organizer: 'Blockchain Club' },
];

const CATEGORIES = ['All', 'Tech', 'Cultural', 'Sports', 'Arts'];

export default function ExplorePage() {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = DUMMY_EVENTS.filter(event => {
        const matchesCategory = activeTab === 'All' || event.category === activeTab;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', flex: 1 }}>
            <div style={{ marginBottom: 'var(--space-8)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>Discover Events</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Find your next big opportunity on campus.</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="glass-panel" style={{
                padding: 'var(--space-4)',
                marginBottom: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                position: 'sticky',
                top: '80px', // Just below navbar
                zIndex: 10
            }}>
                <input
                    type="text"
                    placeholder="Search by event name or organizer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: 'var(--space-3) var(--space-4)',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-bg)',
                        color: 'var(--color-text)',
                        outline: 'none',
                        fontSize: '1rem'
                    }}
                />

                <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }} className="hide-scrollbar">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            style={{
                                padding: 'var(--space-2) var(--space-4)',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid',
                                borderColor: activeTab === category ? 'var(--color-primary)' : 'var(--color-border)',
                                background: activeTab === category ? 'rgba(var(--hue-primary), 80%, 50%, 0.1)' : 'transparent',
                                color: activeTab === category ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                fontWeight: activeTab === category ? 600 : 500,
                                whiteSpace: 'nowrap',
                                transition: 'all var(--transition-fast)'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Event Grid */}
            {filteredEvents.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 'var(--space-6)'
                }}>
                    {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: 'var(--space-16) 0', color: 'var(--color-text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🔍</div>
                    <h3>No events found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
}
