import Link from 'next/link';

export default function CollegeDashboard() {
    return (
        <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', flex: 1, display: 'flex', gap: 'var(--space-8)' }}>
            {/* Sidebar Navigation */}
            <aside style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="glass-panel" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 'var(--space-2)', color: 'var(--color-primary)' }}>
                        Admin Portal
                    </div>
                    <Link href="/college" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-hover)', color: 'var(--color-text)', fontWeight: 600 }}>
                        Dashboard Overview
                    </Link>
                    <Link href="/college/create" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Create Event
                    </Link>
                    <Link href="/college/registrations" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Registrations
                    </Link>
                    <Link href="/college/broadcasts" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Announcements
                    </Link>
                </div>

                <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Logged in as</div>
                    <div style={{ fontWeight: 600 }}>Computer Science Dept</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', marginTop: 'var(--space-1)' }}>Verified Institution ✓</div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-1)' }}>Dashboard Overview</h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>Welcome back. Here&apos;s what&apos;s happening today.</p>
                    </div>
                    <Link href="/college/create" className="btn-primary">
                        + New Event
                    </Link>
                </div>

                {/* Quick Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
                    <div className="glass-panel" style={{ padding: 'var(--space-6)' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Active Events</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>3</div>
                    </div>
                    <div className="glass-panel" style={{ padding: 'var(--space-6)' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Total Registrations</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-secondary)' }}>842</div>
                    </div>
                    <div className="glass-panel" style={{ padding: 'var(--space-6)' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Profile Views</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-accent)' }}>1.2k</div>
                    </div>
                </div>

                {/* Recent Events List */}
                <div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)' }}>Your Active Events</h2>
                    <div className="glass-panel" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Event Name</th>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Date</th>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Registrations</th>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Status</th>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: 'var(--space-4)' }}><Link href="#" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Global Hackathon 2026</Link></td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Mar 15, 2026</td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                            <span style={{ fontWeight: 600 }}>458</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/ 500</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(var(--hue-accent), 90%, 45%, 0.1)', color: 'var(--color-accent)', fontSize: '0.75rem', fontWeight: 600 }}>Published</span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <button style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>Manage</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 'var(--space-4)' }}><Link href="#" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Tech Career Fair</Link></td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Apr 05, 2026</td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                            <span style={{ fontWeight: 600 }}>384</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>/ ∞</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(var(--hue-primary), 80%, 50%, 0.1)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600 }}>Draft</span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <button style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>Manage</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
