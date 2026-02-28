'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Tech',
        capacity: '',
        startDate: '',
        endDate: '',
        location: '',
        description: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';

            // 1. Upload image if exists
            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', imageFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData,
                });

                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    imageUrl = uploadData.url;
                } else {
                    console.error('Image upload failed');
                }
            }

            // 2. Create event
            const eventRes = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    imageUrl,
                    date: formData.startDate, // Using startDate as the main event date for now
                }),
            });

            if (eventRes.ok) {
                router.push('/college');
            } else {
                const error = await eventRes.json();
                alert(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to create event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    <Link href="/college/create" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-hover)', color: 'var(--color-text)', fontWeight: 600 }}>
                        Create Event
                    </Link>
                    <Link href="/college/registrations" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Registrations
                    </Link>
                    <Link href="/college/broadcasts" style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)', transition: 'color var(--transition-fast)' }}>
                        Announcements
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1 }}>
                <div style={{ marginBottom: 'var(--space-8)' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: 'var(--space-1)' }}>Create New Event</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Fill in the details below to publish your event to the campus feed.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    <section>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--color-border)' }}>Basic Information</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--space-4)' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Event Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Annual Tech Symposium"
                                    style={{
                                        width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                        color: 'var(--color-text)', outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                        color: 'var(--color-text)', outline: 'none', appearance: 'none'
                                    }}
                                >
                                    <option value="Tech">Tech</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Arts">Arts</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Total Capacity</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleInputChange}
                                    placeholder="500"
                                    style={{
                                        width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                        color: 'var(--color-text)', outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--color-border)' }}>Event Image</h2>
                        <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
                            <div style={{
                                width: '200px',
                                height: '120px',
                                borderRadius: 'var(--radius-md)',
                                border: '2px dashed var(--color-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                background: 'var(--color-surface)'
                            }}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No image selected</span>
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className="btn-secondary" style={{ cursor: 'pointer', display: 'inline-block' }}>
                                    Choose Image
                                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                                <p style={{ marginTop: 'var(--space-2)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                    Recommend size: 1200x675px (16:9). Max 5MB.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--color-border)' }}>Date & Location</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--space-4)' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Start Date *</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                        color: 'var(--color-text)', outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>End Date *</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                        color: 'var(--color-text)', outline: 'none'
                                    }}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Location / Venue *</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Main Auditorium"
                                    style={{
                                        width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                        color: 'var(--color-text)', outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--color-border)' }}>Description</h2>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.875rem', fontWeight: 500 }}>Event Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Write a compelling description for your event..."
                                rows={6}
                                style={{
                                    width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)', background: 'var(--color-bg)',
                                    color: 'var(--color-text)', outline: 'none', resize: 'vertical'
                                }}
                            ></textarea>
                        </div>
                    </section>

                    <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
                        <button type="button" className="btn-secondary" disabled={loading}>Save Draft</button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Publishing...' : 'Publish Event'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
