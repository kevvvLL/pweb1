export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-utils';
import { isAuthenticated } from '@/lib/auth';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const authenticated = await isAuthenticated();

  return (
    <main className="min-h-screen p-6 md:p-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-block mb-6 text-gray-400 hover:text-gray-600 transition-colors text-sm"
          >
            ← Back to Home
          </Link>

          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900">Blog</h1>

            {authenticated && (
              <Link
                href="/blog/admin"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No posts yet</p>
            {authenticated && (
              <Link
                href="/blog/admin/new"
                className="inline-block mt-4 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Write the first post →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="space-y-2">
                    <time className="text-sm text-gray-400 font-light">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>

                    <h2 className="text-2xl md:text-3xl font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-500 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
