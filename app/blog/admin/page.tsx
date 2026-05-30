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
        <main className="min-h-screen p-6 md:p-12 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <Link
                            href="/blog"
                            className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
                        >
                            ← Back to Blog
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-light text-gray-900">Admin</h1>

                        <Link
                            href="/blog/admin/new"
                            className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-700 transition-colors text-sm"
                        >
                            New Post
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 mb-4">No posts yet</p>
                        <Link
                            href="/blog/admin/new"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Create the first one →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {posts.map((post) => (
                            <div
                                key={post.slug}
                                className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex-1">
                                    <Link href={`/blog/${post.slug}`}>
                                        <h3 className="text-lg font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {new Date(post.date).toLocaleDateString('en-US')}
                                        </p>
                                    </Link>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link
                                        href={`/blog/admin/edit/${post.slug}`}
                                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.slug)}
                                        className="text-sm text-red-400 hover:text-red-600 transition-colors"
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
