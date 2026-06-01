'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [slug, setSlug] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        params.then(p => {
            setSlug(p.slug);
            fetchPost(p.slug);
        });
    }, [params]);

    const fetchPost = async (postSlug: string) => {
        try {
            const res = await fetch(`/api/blog?slug=${postSlug}`);
            const data = await res.json();

            if (res.ok) {
                setTitle(data.title);
                setContent(data.content);
                setExcerpt(data.excerpt || '');
            } else {
                setError('Post not found');
            }
        } catch (err) {
            setError('Failed to load post');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
            const res = await fetch('/api/blog', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, title, content, excerpt }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/blog/admin');
            } else {
                setError(data.error || 'Failed to update post');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen px-6 py-16 md:py-24 bg-white">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm text-[#6b7280]">Loading...</p>
                </div>
            </main>
        );
    }

    if (error && !title) {
        return (
            <main className="min-h-screen px-6 py-16 md:py-24 bg-white">
                <div className="max-w-3xl mx-auto">
                    <p className="text-red-500 text-sm">{error}</p>
                    <Link href="/blog/admin" className="text-sm text-[#6b7280] hover:text-[#0a0a0a] mt-4 inline-block transition-colors">
                        ← Back
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-6 py-16 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="mb-16">
                    <Link
                        href="/blog/admin"
                        className="inline-block mb-8 text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                    >
                        ← Back
                    </Link>

                    <h1 className="text-4xl font-semibold text-[#0a0a0a] border-b border-[#e5e7eb] pb-8">Edit Post</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-sm text-[#6b7280] mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-0 py-3 border-b border-[#e5e7eb] focus:border-[#0a0a0a] outline-none transition-colors bg-transparent text-[#0a0a0a] text-2xl font-medium placeholder:text-[#6b7280]"
                            placeholder="Enter title..."
                            required
                            disabled={saving}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-[#6b7280] mb-2">Excerpt (optional)</label>
                        <input
                            type="text"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full px-0 py-3 border-b border-[#e5e7eb] focus:border-[#0a0a0a] outline-none transition-colors bg-transparent text-[#0a0a0a] placeholder:text-[#6b7280]"
                            placeholder="Short description..."
                            disabled={saving}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-[#6b7280] mb-2">Content (Markdown supported)</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-0 py-3 border-b border-[#e5e7eb] focus:border-[#0a0a0a] outline-none transition-colors bg-transparent text-[#0a0a0a] font-mono text-sm leading-relaxed resize-none placeholder:text-[#6b7280]"
                            placeholder="Start writing..."
                            rows={20}
                            required
                            disabled={saving}
                        />
                        <p className="text-xs text-[#6b7280] mt-2">
                            Markdown supported: # Heading, **bold**, *italic*, [link](url)
                        </p>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#374151] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>

                        <Link
                            href="/blog/admin"
                            className="px-6 py-2.5 border border-[#e5e7eb] text-sm text-[#6b7280] hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-colors inline-block text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
