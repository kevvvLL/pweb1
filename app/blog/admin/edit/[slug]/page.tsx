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
            <main className="min-h-screen p-6 md:p-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <p className="text-gray-400">Loading...</p>
                </div>
            </main>
        );
    }

    if (error && !title) {
        return (
            <main className="min-h-screen p-6 md:p-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <p className="text-red-500">{error}</p>
                    <Link href="/blog/admin" className="text-gray-600 hover:text-gray-900 mt-4 inline-block">
                        ← Back to Admin
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-6 md:p-12 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <Link
                        href="/blog/admin"
                        className="inline-block mb-6 text-gray-400 hover:text-gray-600 transition-colors text-sm"
                    >
                        ← Back to Admin
                    </Link>

                    <h1 className="text-4xl font-light text-gray-900">Edit Post</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border-b border-gray-200 focus:border-gray-900 outline-none transition-colors bg-transparent text-gray-900 text-2xl font-light"
                            placeholder="Enter title..."
                            required
                            disabled={saving}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Excerpt (optional)</label>
                        <input
                            type="text"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className="w-full px-4 py-3 border-b border-gray-200 focus:border-gray-900 outline-none transition-colors bg-transparent text-gray-900"
                            placeholder="Short description..."
                            disabled={saving}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Content (Markdown supported)</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 outline-none transition-colors bg-transparent text-gray-900 font-mono text-sm leading-relaxed resize-none"
                            placeholder="Start writing..."
                            rows={20}
                            required
                            disabled={saving}
                        />
                        <p className="text-xs text-gray-400 mt-2">
                            Markdown supported: # Heading, **bold**, *italic*, [link](url), etc.
                        </p>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>

                        <Link
                            href="/blog/admin"
                            className="px-8 py-3 border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors inline-block text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
