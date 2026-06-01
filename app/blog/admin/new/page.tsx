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
        <main className="min-h-screen px-6 py-16 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="mb-16">
                    <Link
                        href="/blog/admin"
                        className="inline-block mb-8 text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                    >
                        ← Back
                    </Link>

                    <h1 className="text-4xl font-semibold text-[#0a0a0a] border-b border-[#e5e7eb] pb-8">New Post</h1>
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
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
                            className="px-6 py-2.5 bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#374151] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Publishing...' : 'Publish'}
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
