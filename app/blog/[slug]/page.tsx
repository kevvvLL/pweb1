export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog-utils';
import { isAuthenticated } from '@/lib/auth';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    const authenticated = await isAuthenticated();

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen p-6 md:p-12 bg-white">
            <article className="max-w-3xl mx-auto">
                <div className="mb-12 flex items-center justify-between">
                    <Link
                        href="/blog"
                        className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
                    >
                        ← Back to Blog
                    </Link>

                    {authenticated && (
                        <Link
                            href={`/blog/admin/edit/${slug}`}
                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Edit
                        </Link>
                    )}
                </div>

                <header className="mb-12 space-y-4">
                    <time className="text-sm text-gray-400 font-light">
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>

                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
                        {post.title}
                    </h1>
                </header>

                <div className="prose prose-lg prose-gray max-w-none">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-3xl font-light text-gray-900 mt-12 mb-6">{children}</h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl font-light text-gray-900 mt-10 mb-4">{children}</h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl font-light text-gray-900 mt-8 mb-3">{children}</h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    className="text-gray-900 underline hover:text-gray-600 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {children}
                                </a>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">{children}</ol>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-gray-300 pl-6 italic text-gray-600 my-6">
                                    {children}
                                </blockquote>
                            ),
                            code: ({ children }) => (
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                                    {children}
                                </code>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
        </main>
    );
}
