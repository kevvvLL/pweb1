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
        <main className="min-h-screen px-6 py-16 md:py-24 bg-white">
            <article className="max-w-3xl mx-auto">
                <div className="mb-16 flex items-center justify-between">
                    <Link
                        href="/blog"
                        className="text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                    >
                        ← Back
                    </Link>

                    {authenticated && (
                        <Link
                            href={`/blog/admin/edit/${slug}`}
                            className="text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                        >
                            Edit
                        </Link>
                    )}
                </div>

                <header className="mb-16">
                    <time className="text-sm text-[#6b7280] block mb-4">
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>

                    <h1 className="text-4xl font-semibold text-[#0a0a0a] leading-tight">
                        {post.title}
                    </h1>
                </header>

                <div className="max-w-none">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-2xl font-semibold text-[#0a0a0a] mt-12 mb-6">{children}</h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-xl font-medium text-[#0a0a0a] mt-10 mb-4">{children}</h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-base font-medium text-[#0a0a0a] mt-8 mb-3">{children}</h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-base text-[#374151] leading-relaxed mb-6">{children}</p>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    className="text-[#0a0a0a] underline underline-offset-2 hover:text-[#6b7280] transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {children}
                                </a>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-2 mb-6 text-[#374151]">{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-2 mb-6 text-[#374151]">{children}</ol>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-[#e5e7eb] pl-6 italic text-[#6b7280] my-8">
                                    {children}
                                </blockquote>
                            ),
                            code: ({ children }) => (
                                <code className="bg-[#fafafa] border border-[#e5e7eb] px-1.5 py-0.5 text-sm font-mono text-[#0a0a0a]">
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
