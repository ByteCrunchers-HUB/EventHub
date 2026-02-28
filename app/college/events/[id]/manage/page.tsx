'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface Attendee {
    id: string;
    name: string;
    email: string;
    college: string;
    status: string;
    registeredAt: string;
}

interface EventData {
    event: {
        id: string;
        title: string;
        date: string;
        location: string;
        capacity: number;
        category: string;
        attendeeCount: number;
    };
    attendees: Attendee[];
    registrationsByCollege: Record<string, number>;
}

export default function EventManagePage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const [data, setData] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/college/events/${params.id}/analytics`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [params.id]);

    if (loading) {
        return (
            <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center', flex: 1 }}>
                <p>Loading analytics for this event...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center', flex: 1 }}>
                <h2>Event Analytics Not Found</h2>
                <Link href="/college" className="btn-primary" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>Back to Dashboard</Link>
            </div>
        );
    }

    const { event, attendees, registrationsByCollege } = data;

    // Chart Data
    const pieData = {
        labels: ['Registered', 'Available Spots'],
        datasets: [{
            data: [event.attendeeCount, Math.max(0, event.capacity - event.attendeeCount)],
            backgroundColor: ['#6366f1', 'rgba(255, 255, 255, 0.05)'],
            borderColor: ['#6366f1', 'rgba(255, 255, 255, 0.1)'],
            borderWidth: 1,
        }]
    };

    const barLabels = Object.keys(registrationsByCollege);
    const barData = {
        labels: barLabels,
        datasets: [{
            label: 'Students by College',
            data: Object.values(registrationsByCollege),
            backgroundColor: '#10b981',
            borderRadius: 6,
        }]
    };

    return (
        <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
                <div>
                    <Link href="/college" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: 'var(--space-2)', fontWeight: 600 }}>← Back to Overview</Link>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-1)' }}>Manage: {event.title}</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Real-time student analysis and registration data.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-4)', textAlign: 'center' }}>Capacity Overview</h3>
                    <div style={{ width: '240px', height: '240px' }}>
                        <Pie data={pieData} options={{
                            plugins: {
                                legend: { position: 'bottom', labels: { color: '#94a3b8' } }
                            },
                            maintainAspectRatio: false
                        }} />
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-4)' }}>Registrations by College</h3>
                    <div style={{ flex: 1, minHeight: '240px' }}>
                        <Bar data={barData} options={{
                            indexAxis: 'y' as const,
                            plugins: { legend: { display: false } },
                            scales: {
                                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                                y: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                            },
                            maintainAspectRatio: false
                        }} />
                    </div>
                </div>
            </div>

            <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-4)' }}>Student Attendee List ({attendees.length})</h2>
                <div className="glass-panel" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Name</th>
                                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Email</th>
                                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>College</th>
                                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Registered At</th>
                                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendees.map(attendee => (
                                <tr key={attendee.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: 'var(--space-4)', fontWeight: 600 }}>{attendee.name}</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{attendee.email}</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{attendee.college}</td>
                                    <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{new Date(attendee.registeredAt).toLocaleDateString()}</td>
                                    <td style={{ padding: 'var(--space-4)' }}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '2px 8px',
                                            borderRadius: 'var(--radius-full)',
                                            background: 'rgba(var(--hue-accent), 45%, 0.1)',
                                            color: 'var(--color-accent)',
                                            fontSize: '0.75rem',
                                            fontWeight: 600
                                        }}>{attendee.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
