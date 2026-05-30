'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, excerpt }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/blog/admin');
            } else {
                setError(data.error || 'Failed to create post');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

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

                    <h1 className="text-4xl font-light text-gray-900">New Post</h1>
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
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
                            className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Publishing...' : 'Publish'}
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
