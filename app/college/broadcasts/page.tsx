import Link from 'next/link';

export default function BroadcastsPage() {
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
                    <Link href="/college/registrations" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Registrations
                    </Link>
                    <Link href="/college/broadcasts" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-hover)', color: 'var(--color-text)', fontWeight: 600 }}>
                        Announcements
                    </Link>
                </div>
            </aside>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-1)' }}>Broadcast Announcements</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Send mass updates directly to participants of your events.</p>
                </div>

                <div className="glass-panel" style={{ padding: 'var(--space-8)' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)' }}>New Broadcast</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Target Event *</label>
                            <select style={{
                                width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                color: 'var(--color-text)', outline: 'none', appearance: 'none'
                            }}>
                                <option>Global Hackathon 2026</option>
                                <option>Web3 Onboarding Workshop</option>
                                <option>All Active Events</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Subject Line *</label>
                            <input type="text" placeholder="e.g. Venue Change for Hackathon" style={{
                                width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                color: 'var(--color-text)', outline: 'none'
                            }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Message Content *</label>
                            <textarea placeholder="Write your announcement..." rows={6} style={{
                                width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                color: 'var(--color-text)', outline: 'none', resize: 'vertical'
                            }}></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                            <button type="button" className="btn-secondary">Save Draft</button>
                            <button type="button" className="btn-primary" style={{ flex: 1 }}>Send Broadcast Now 🚀</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
