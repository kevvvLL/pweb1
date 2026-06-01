'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
}

export default function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blog');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/blog');
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/blog?slug=${slug}`, { method: 'DELETE' });
            if (res.ok) {
                fetchPosts();
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <main className="min-h-screen px-6 py-16 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href="/blog"
                            className="text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                        >
                            ← Back
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-8">
                        <h1 className="text-4xl font-semibold text-[#0a0a0a]">Admin</h1>

                        <Link
                            href="/blog/admin/new"
                            className="px-4 py-2 bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#374151] transition-colors"
                        >
                            New Post
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <p className="text-sm text-[#6b7280]">Loading...</p>
                ) : posts.length === 0 ? (
                    <div className="py-20">
                        <p className="text-[#6b7280] mb-4">No posts yet.</p>
                        <Link
                            href="/blog/admin/new"
                            className="text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                        >
                            Create the first one →
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-[#e5e7eb]">
                        {posts.map((post) => (
                            <div
                                key={post.slug}
                                className="flex items-center justify-between py-5 group"
                            >
                                <div className="flex-1 min-w-0 pr-8">
                                    <Link href={`/blog/${post.slug}`}>
                                        <h3 className="text-base font-medium text-[#0a0a0a] group-hover:text-[#6b7280] transition-colors truncate">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-[#6b7280] mt-0.5">
                                            {new Date(post.date).toLocaleDateString('en-US')}
                                        </p>
                                    </Link>
                                </div>

                                <div className="flex items-center gap-6 shrink-0">
                                    <Link
                                        href={`/blog/admin/edit/${post.slug}`}
                                        className="text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.slug)}
                                        className="text-sm text-[#6b7280] hover:text-red-500 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
