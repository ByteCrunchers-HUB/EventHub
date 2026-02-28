import Link from 'next/link';

export default function RegistrationsPage() {
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
                    <Link href="/college/broadcasts" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Announcements
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
                    <select style={{
                        padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                        color: 'var(--color-text)', outline: 'none', fontWeight: 600, minWidth: '200px'
                    }}>
                        <option>Global Hackathon 2026</option>
                        <option>Web3 Onboarding Workshop</option>
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 'var(--space-6)', alignItems: 'start' }}>

                    {/* Left Column: Attendee List */}
                    <div className="glass-panel" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <input type="text" placeholder="Search attendees by name or email..." style={{
                                width: '100%', maxWidth: '300px', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none'
                            }} />
                            <button className="btn-secondary" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: '0.875rem' }}>Export CSV</button>
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Name</th>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Email</th>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Major / Year</th>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Status</th>
                                    <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: 'var(--space-4)', fontWeight: 500 }}>Jane Doe</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>j.doe@university.edu</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Computer Science / 3rd</td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(var(--hue-primary), 80%, 50%, 0.1)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600 }}>Confirmed</span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}><button style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>Revoke</button></td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: 'var(--space-4)', fontWeight: 500 }}>John Smith</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>j.smith@university.edu</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Electrical Eng / 2nd</td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(var(--hue-primary), 80%, 50%, 0.1)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600 }}>Confirmed</span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}><button style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>Revoke</button></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 'var(--space-4)', fontWeight: 500 }}>Alice Johnson</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>a.johns@university.edu</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Information Systems / 4th</td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-hover)', color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>Waitlisted</span>
                                    </td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <button style={{ color: 'var(--color-primary)', fontSize: '0.875rem', textDecoration: 'underline', marginRight: 'var(--space-2)' }}>Approve</button>
                                        <button style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'underline' }}>Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Right Column: Broadcast Controls */}
                    <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-1)' }}>Quick Broadcast</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Send an update to all confirmed attendees.</p>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Subject</label>
                            <input type="text" placeholder="e.g. Change in Venue" style={{
                                width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none'
                            }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Message</label>
                            <textarea placeholder="Type your announcement here..." rows={4} style={{
                                width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', outline: 'none', resize: 'vertical'
                            }}></textarea>
                        </div>

                        <button className="btn-primary" style={{ width: '100%' }}>Send Broadcast 📢</button>
                    </div>

                </div>
            </main>
        </div>
    );
}
