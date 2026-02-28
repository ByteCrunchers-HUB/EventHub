import Link from 'next/link';

export interface EventProps {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    organizer: string;
    imageUrl?: string;
}

export default function EventCard({ event }: { event: EventProps }) {
    return (
        <Link href={`/explore/${event.id}`} style={{ display: 'block' }}>
            <div className="glass-panel hover-elevate" style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}>
                {/* Placeholder for Image */}
                <div style={{
                    height: '160px',
                    background: `linear-gradient(45deg, var(--color-surface), rgba(var(--hue-primary), 50%, 50%, 0.1))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    fontSize: '2rem',
                    borderBottom: '1px solid var(--color-border)'
                }}>
                    {event.category === 'Tech' ? '💻' : event.category === 'Cultural' ? '🎭' : '📅'}
                </div>

                <div style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: 'var(--space-1) var(--space-2)',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--color-surface-hover)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        marginBottom: 'var(--space-2)',
                        width: 'max-content'
                    }}>
                        {event.category}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>{event.title}</h3>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span>🗓️</span> {event.date}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span>📍</span> {event.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span>🎓</span> {event.organizer}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
