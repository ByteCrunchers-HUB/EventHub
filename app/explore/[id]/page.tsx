import Link from 'next/link';

export default function EventDetailsPage({ params }: { params: { id: string } }) {
    // In a real app, fetch from database using params.id
    // This is mock data for presentation
    const event = {
        id: params.id,
        title: 'Global Hackathon 2026',
        category: 'Tech',
        date: 'March 15, 2026 - March 17, 2026',
        time: '09:00 AM - 05:00 PM',
        location: 'Main Auditorium, Tech Block B',
        organizer: 'Computer Science Dept & Developer Student Club',
        description: 'Join over 500+ students in our biggest 48-hour hackathon of the year. Build innovative solutions for real-world problems using cutting edge AI and Web3 tools. Mentors from top tech companies will be present. Free food, schwags, and cash prizes worth $10,000 up for grabs.',
        spotsLeft: 42,
        totalCapacity: 500,
    };

    if (!event || event.id !== '1') {
        // Just for demo, we only pretend id: '1' exists deeply
        // but we will render it anyway for the aesthetic
    }

    return (
        <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', flex: 1 }}>
            <Link href="/explore" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                color: 'var(--color-primary)',
                fontWeight: 600,
                marginBottom: 'var(--space-6)',
                transition: 'color var(--transition-fast)'
            }}>
                ← Back to Explore
            </Link>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
                gap: 'var(--space-8)',
                alignItems: 'start'
            }}>
                {/* Left Column: Main Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                    <div>
                        <div style={{
                            display: 'inline-block',
                            padding: 'var(--space-1) var(--space-3)',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(var(--hue-primary), 80%, 50%, 0.1)',
                            color: 'var(--color-primary)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            marginBottom: 'var(--space-4)'
                        }}>
                            {event.category}
                        </div>

                        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)', lineHeight: 1.1 }}>{event.title}</h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>Hosted by <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{event.organizer}</span></p>
                    </div>

                    <div className="glass-panel" style={{
                        height: '300px',
                        background: 'linear-gradient(45deg, var(--color-surface), rgba(var(--hue-secondary), 50%, 50%, 0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-secondary)',
                        fontSize: '4rem'
                    }}>
                        {event.category === 'Tech' ? '💻' : '📅'}
                    </div>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>About this Event</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', lineHeight: 1.8 }}>
                            {event.description}
                        </p>
                    </section>
                </div>

                {/* Right Column: Registration Card */}
                <div className="glass-panel" style={{
                    padding: 'var(--space-6)',
                    position: 'sticky',
                    top: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-6)'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
                            Registration Details
                        </h3>

                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', color: 'var(--color-text-muted)' }}>
                            <li style={{ display: 'flex', gap: 'var(--space-3)' }}>
                                <span>🗓️</span>
                                <div>
                                    <strong style={{ display: 'block', color: 'var(--color-text)' }}>Date</strong>
                                    {event.date}
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: 'var(--space-3)' }}>
                                <span>⏰</span>
                                <div>
                                    <strong style={{ display: 'block', color: 'var(--color-text)' }}>Time</strong>
                                    {event.time}
                                </div>
                            </li>
                            <li style={{ display: 'flex', gap: 'var(--space-3)' }}>
                                <span>📍</span>
                                <div>
                                    <strong style={{ display: 'block', color: 'var(--color-text)' }}>Location</strong>
                                    {event.location}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div style={{ background: 'var(--color-surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                            <span style={{ fontWeight: 600 }}>Spots Remaining</span>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{event.spotsLeft} / {event.totalCapacity}</span>
                        </div>
                        {/* Progress Bar */}
                        <div style={{ width: '100%', height: '8px', background: 'var(--color-bg)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <div style={{ width: `${((event.totalCapacity - event.spotsLeft) / event.totalCapacity) * 100}%`, height: '100%', background: 'var(--color-primary)' }}></div>
                        </div>
                    </div>

                    <button className="btn-primary" style={{ width: '100%', fontSize: '1.125rem', padding: 'var(--space-4)' }}>
                        Register Now (1-Click)
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        By registering, you agree to the EventHub terms and campus guidelines.
                    </p>
                </div>
            </div>
        </div>
    );
}
