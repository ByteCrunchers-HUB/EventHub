import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>My Profile</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>Manage your registrations and digital tickets.</p>
                </div>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span>⚙️</span> Settings
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 'var(--space-8)', alignItems: 'start' }}>
                {/* Left Column: Explorer Identity */}
                <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3rem', color: 'white', marginBottom: 'var(--space-4)'
                    }}>
                        👨‍🎓
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-1)' }}>Jane Doe</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>Computer Science, 3rd Year</p>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', padding: 'var(--space-4) 0', borderTop: '1px solid var(--color-border)' }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>12</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Attended</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>3</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Upcoming</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Registrations */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        🎟️ Upcoming Tickets
                    </h3>

                    {/* Ticket Card 1 */}
                    <div className="glass-panel hover-elevate" style={{ display: 'flex', overflow: 'hidden' }}>
                        <div style={{ background: 'var(--color-primary)', width: '8px' }}></div>
                        <div style={{ padding: 'var(--space-4) var(--space-6)', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', background: 'var(--color-surface)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>Tech</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)', background: 'var(--color-surface)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>Confirmed</span>
                                </div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-1)' }}>Global Hackathon 2026</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>March 15, 2026 • Main Auditorium</p>
                            </div>
                            <button className="btn-primary" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: '0.875rem' }}>View QR</button>
                        </div>
                    </div>

                    {/* Ticket Card 2 */}
                    <div className="glass-panel hover-elevate" style={{ display: 'flex', overflow: 'hidden' }}>
                        <div style={{ background: 'var(--color-secondary)', width: '8px' }}></div>
                        <div style={{ padding: 'var(--space-4) var(--space-6)', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-secondary)', background: 'var(--color-surface)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>Workshop</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', background: 'var(--color-surface)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>Waitlisted</span>
                                </div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-1)' }}>Web3 Onboarding Workshop</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>March 28, 2026 • Lab 4</p>
                            </div>
                            <button className="btn-secondary" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: '0.875rem' }}>Details</button>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                        <Link href="/explore" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}>+ Discover More Events</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
